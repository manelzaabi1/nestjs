
import { ObjectId } from 'mongodb';

export class Post {
  _id?: ObjectId;
  title: string;
  createdAt: Date;
  description: string;
  status: boolean;
}
