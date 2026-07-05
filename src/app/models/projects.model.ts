export interface addProjectRequest {
  name: string;
  description: string;
}

export interface ListProjectsResponse {
  id: string;
  name: string;
  description: string;
  created_at: string;
  created_by: string;
}
