import { User } from "firebase/auth";

export interface IUser extends Partial<User>{
  userName?: string;
  uid: string
}

