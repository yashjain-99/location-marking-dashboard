declare type User = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  sub: string;
  token: string;
  logout: () => Promise<void>;
};
