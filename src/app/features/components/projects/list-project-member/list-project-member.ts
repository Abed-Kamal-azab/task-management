import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tm-list-project-member',
  imports: [],
  templateUrl: './list-project-member.html',
  styleUrl: './list-project-member.scss',
})
export class ListProjectMember implements OnInit {
  private projectsService = inject(ProjectsService);
  private activatedRoute = inject(ActivatedRoute);

  projectID = this.activatedRoute.snapshot.paramMap.get('id');
  // projectID = 'cb1bf27c-d4c3-4ce3-a063-dc348062f160';

  ngOnInit(): void {
    console.log('abed kamal');
    // this.getMember(this.projectID);
  }

  getMember(projectId: string) {
    this.projectsService.getProjectMembers(projectId).subscribe({
      next: (res) => {
        console.log(res);
      },
      complete: () => {},
      error: () => {},
    });
  }
}
