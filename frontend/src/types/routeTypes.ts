import { BASE_URL } from "../contstants";

export enum IRoutes {
  Login = "/login",
  Logout = "/logout",
}

const genereateEndpoint = (uri: IRoutes): string => {
  return `${BASE_URL}${uri}`;
};
// genereateEndpoint(Holla.Login);
