import { Component, inject, OnInit, signal } from '@angular/core';
import { ProjectsService } from '../../../services/projects-service';
import { ListProjectsResponse } from '../../../../models/projects.model';
import { DatePipe, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'tm-list-projects',
  imports: [DatePipe, RouterLink, NgClass, Button],
  templateUrl: './list-projects.html',
  styleUrl: './list-projects.scss',
})
export class ListProjects implements OnInit {
  projectsService = inject(ProjectsService);
  private router = inject(Router);

  myListProjects = signal<ListProjectsResponse[]>([]);
  currentPage = signal(1);
  pageSize = signal(5);
  totalCount = signal(0);
  totalPages = signal(0);
  pageNumbers = signal<number[]>([]);

  isLoading = signal(false);
  hasError = signal(false);
  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.projectsService.getAllProjects(this.pageSize(), this.getOffset()).subscribe({
      next: (response) => {
        const projects = (response.body ?? []) as ListProjectsResponse[];
        const contentRange = response.headers.get('content-range') ?? '';

        this.myListProjects.set(projects);
        this.totalCount.set(this.getTotalCount(contentRange));
        const pages = Math.max(1, Math.ceil(this.totalCount() / this.pageSize()));
        this.totalPages.set(pages);
        this.pageNumbers.set(Array.from({ length: pages }, (_, index) => index + 1));
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.currentPage.set(page);
    this.loadProjects();
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  private getOffset(): number {
    const safePage = Number.isFinite(this.currentPage())
      ? Math.max(1, Math.floor(this.currentPage()))
      : 1;
    const safePageSize = Number.isFinite(this.pageSize())
      ? Math.max(1, Math.floor(this.pageSize()))
      : 5;
    return (safePage - 1) * safePageSize;
  }

  private getTotalCount(contentRange: string): number {
    const parts = contentRange.split('/');
    const total = parts.length > 1 ? Number(parts[1]) : NaN;
    return Number.isFinite(total) ? total : this.myListProjects().length;
  }

  getProjectData(project: ListProjectsResponse) {
    this.router.navigate([`/projects/edit/${project.id}`], {
      state: { project },
    });
  }
}
