import { Types } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
}

export interface IUser {
  email: string;
  username: string;
  password: string;
}

export interface IItem {
  uId: Types.ObjectId;
  category: string;
  name: string;
  comment: string;
  rating: number;
  imageUrl: string;
  released: number;
  extraFields?: {
    [key: string]: string;
  };
}

export interface Items {
  name: string;
  comment: string;
  rating: number;
  released: number;
  imageUrl: string;
  extraFields?: {
    [key: string]: string | undefined;
  };
}
