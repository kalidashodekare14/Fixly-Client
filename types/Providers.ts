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
