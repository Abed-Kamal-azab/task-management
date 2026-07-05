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
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'tm-add-new-project',
  imports: [ReactiveFormsModule, FormsModule, NgClass, RouterLink],
  templateUrl: './add-new-project.html',
  styleUrl: './add-new-project.scss',
})
export class AddNewProject implements OnInit {
  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  projectsService = inject(ProjectsService);
  isAddProjectSuccess = signal<boolean>(false);
  isAddProjectFailed = signal<boolean>(false);

  ngOnInit(): void {
    this.initFormModel();
  }

  initFormModel() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }
  addNewProject() {
    this.projectsService.createNewProjects(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      complete: () => {
        this.isAddProjectSuccess.set(true);
        this.form.reset();
        setTimeout(() => {
          this.isAddProjectSuccess.set(false);
          this.router.navigate(['/projects']);
        }, 5000);
      },
      error: () => {
        this.isAddProjectFailed.set(true);
        setTimeout(() => {
          this.isAddProjectFailed.set(false);
        }, 5000);
      },
    });
  }
}
