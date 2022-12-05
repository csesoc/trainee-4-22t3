import { Types } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
  profileImgUrl: string;
}

export interface IUser {
  email: string;
  username: string;
  password: string;
  profileImgUrl: string;
}

export interface IItem {
  uId: Types.ObjectId;
  category: string;
  name: string;
  comment: string;
  rating: number;
  imageUrl: string;
  imageRef: string;
  released: number;
  createdBy: string;
  extraFields: {
    [key: string]: string;
  };
}

export interface Items {
  name: string;
  comment: string;
  rating: number;
  released: number;
  imageUrl: string;
  imageRef: string;
  createdBy: string;
  extraFields: {
    [key: string]: string;
  };
}
