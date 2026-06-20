import {
  cookieAccessOptions,
  cookieRefreshOptions,
} from "../../config/security/cookie.config.js";

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, cookieAccessOptions);
  res.cookie("refreshToken", refreshToken, cookieRefreshOptions);
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", cookieAccessOptions);
  res.clearCookie("refreshToken", cookieRefreshOptions);
};

export { clearAuthCookies, setAuthCookies };
