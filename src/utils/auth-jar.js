import Cookies from "js-cookie";

export const isAuth = () => {
  return !!Cookies.get("auth");
};
