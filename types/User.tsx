export interface IUser {
  image?: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'provider' | 'admin';
  phone?: string;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  bio?: string;
  isVerified: boolean;
  averageRating: number;
  totalReviews: number;
}

export interface IUserResponse {
  success: boolean;
  message: string;
  data: IUser;
}
