import { IUser } from "../models/userModel";
declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser;
    }
  }
}
