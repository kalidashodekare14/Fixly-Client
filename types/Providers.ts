// export interface Provider {
//   id: number;
//   image: string;
//   name: string;
//   location: string;
//   services: string[];
//   rating: number;
//   price: number;
//   available: boolean;
//   job_done: number;
// }

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
  skills: [
    {
      _id: string;
      label: string;
    },
  ];
  rating: number;
  price: number;
  rate: number;
  rateType: string;
  availableStatus: boolean;
  experience: number;
}

export interface IProviderReview {
  _id: string;
  comment: string;
  createdAt: string;
  rating: number;

  request: {
    category: {
      label: string;
    };
  };

  user: {
    _id: string;
    name: string;
    image: string;
    location: {
      address: string;
    };
  };
}
