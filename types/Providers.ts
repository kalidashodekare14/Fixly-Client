export interface Provider {
  id: number;
  image: string;
  name: string;
  location: string;
  services: string[];
  rating: number;
  price: number;
  available: boolean;
  job_done: number;
}

export interface IUserResponse {
  success: boolean;
  message: string;
  data: '';
}

export interface IPublicProvider {
  _id: number;
  image: string;
  name: string;
  user: {
    name: string;
    image: string;
  };
  location: {
    address: string;
  };
  services: string[];
  rating: number;
  price: number;
  rate: number;
  rateType: string;
  availableStatus: boolean;
  experience: number;
}
