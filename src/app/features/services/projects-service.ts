import { inject, Injectable } from '@angular/core';
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
}
