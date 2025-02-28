declare type User = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  sub: string;
};

declare type CurrLocation = {
  id: number;
  userId: string;
  lat: number;
  long: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

declare type SelectedLocation = {
  lng: number;
  lat: number;
};
