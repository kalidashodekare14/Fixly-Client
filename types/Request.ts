export interface IRequest {
  _id: string;
  image: string;
  title: string;
  category: {
    _id: string;
    label: string;
  };
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  budget: number;
  deadline: string;
  location: {
    address: string;
    city: string;
    division: string;
    postalCode: string;
    coordinates: [number, number];
  };
}
