export interface Review {
  name: string;
  location: string;
  review: string;
  rating: number;
  image: string;
}

export interface IReview {
  _id: string;
  comment: string;
  createdAt: string;
  rating: number;

  request: {
    category: {
      label: string;
    };
  };

  provider: {
    _id: string;
    bio?: string;
    experience?: number;
    rating?: number;
    reviews?: number;
    location: {
      address: string;
    };

    user: {
      _id: string;
      name: string;
      image: string;
    };
  };
}
