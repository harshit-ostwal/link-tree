import ApiError from "../../core/http/api.error.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { AccountService } from "./account.service.js";

const authorizeAccountOwner = asyncHandler(async (req, _res, next) => {
  const accounts = await new AccountService().getAccountsByUserId(req.user.id);

  if (accounts.some((account) => account.userId !== req.user.id)) {
    throw ApiError.forbidden("You are not authorized to access this account.");
  }

  req.accounts = accounts;
  next();
});

export { authorizeAccountOwner };
