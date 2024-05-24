import { Cars } from "./cars";
import { User } from "./user";

export interface Rent {
  _id: String;
  car: Cars;
  user: User;
  dateIn: String;
  dateOut: String;
  price: String;
  status: Number;
}
