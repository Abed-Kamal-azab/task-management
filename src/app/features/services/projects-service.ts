import { inject, Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../core/services/api-service';
import { addProjectRequest } from '../../models/projects.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiService = inject(ApiService);

  createNewProjects(data: addProjectRequest) {
    return this.apiService.post('rest/v1/projects', data);
  }

  getAllProjects(limit: number, offset: number) {
    const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.floor(limit)) : 5;
    const safeOffset = Number.isFinite(offset) ? Math.max(0, Math.floor(offset)) : 0;
    const headers = new HttpHeaders({
      Prefer: 'count=exact',
    });

    return this.apiService.getWithHeaders(
      `rest/v1/rpc/get_projects?limit=${safeLimit}&offset=${safeOffset}`,
      headers,
    );
  }
}
