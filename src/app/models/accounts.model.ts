export interface SignUpRequest {
  email: string;
  password: string;
  data: {
    name: string;
    department: string;
  };
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    role: string;
    user_metadata: UserMetadata;
  };
}

export interface signupResponse {
  email: string;
  password: string;
  data: {
    name: string;
    department: string;
  };
}

export interface UserMetadata {
  name: string;
  department: string;
}
