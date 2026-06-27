import { cookieRefreshOptions } from "../../config/security/cookie.config.js";

const setAuthCookies = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, cookieRefreshOptions);
};

const clearAuthCookies = (res) => {
  res.clearCookie("refreshToken", cookieRefreshOptions);
};

export { clearAuthCookies, setAuthCookies };
