export interface IRequest {
  _id: string;
  image: string;
  title: string;
  category: string;
  status: 'pending' | 'accepted' | 'completed';
  description: string;
  budget: number;
  deadline: string;
  location: {
    address: string;
    city: string;
    division: string;
    postalCode: string;
    coordinates: [];
  };
}
