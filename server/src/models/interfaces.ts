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
  _id: Types.ObjectId;
  uId: Types.ObjectId;
  category: string;
  name: string;
  comment: string;
  rating: number;
  imageUrl: string;
  imageRef: string;
  extraFields: {
    [key: string]: string;
  };
}

export interface Items {
  itemId: Types.ObjectId;
  name: string;
  comment: string;
  rating: number;
  imageUrl: string;
  imageRef: string;
  extraFields: {
    [key: string]: string;
  };
}
