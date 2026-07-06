import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectsService } from '../../../services/projects-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListProjectsResponse } from '../../../../models/projects.model';

@Component({
  selector: 'tm-edit-project',
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './edit-project.html',
  styleUrl: './edit-project.scss',
})
export class EditProject implements OnInit {
  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  projectsService = inject(ProjectsService);
  isAddProjectSuccess = signal<boolean>(false);
  isAddProjectFailed = signal<boolean>(false);
  isEdit = signal<boolean>(false);
  projectID = this.activatedRoute.snapshot.paramMap.get('id');
  selectedProject: ListProjectsResponse | null = null;

  ngOnInit(): void {
    this.initFormModel();

    if (this.projectID) {
      this.isEdit.set(true);
      this.getProjectById(this.projectID);
    } else {
      this.isEdit.set(false);
    }
  }

  initFormModel() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }

  getProjectById(projectId: string) {
    this.projectsService.getProjectById(projectId).subscribe({
      next: (project) => {
        const selectedProject = project[0];

        if (selectedProject) {
          this.selectedProject = selectedProject;
          this.form.patchValue({
            name: selectedProject.name,
            description: selectedProject.description,
          });
        }
      },
      error: (err) => {
        console.error('Failed to load project', err);
      },
    });
  }

  editProject() {
    const payload = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
    } as ListProjectsResponse;

    if (this.projectID) {
      this.projectsService.updateProject(this.projectID, payload).subscribe({
        next: (res) => {
          console.log(res);
        },
        complete: () => {},
        error: () => {},
      });
    }

    this.router.navigate(['/projects']);
  }
}
