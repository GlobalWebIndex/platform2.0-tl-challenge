export interface Breed {
  id: number;
  title: string;
  imageUrl?: string;
  details?: string;
}

export interface Cat {
  id: number;
  title: string;
  imageUrl: string;
  breedId?: number;
  breed?: Breed;
}

export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Favourite {
  id: number;
  cat: Cat;
}
export interface String {
  IsNullUndefinedOrEmpty(): Boolean;
}
