import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { AccountDto } from "./account.dto.js";
import AccountMessages from "./account.messages.js";
import { AccountService } from "./account.service.js";

class AccountController {
  #accountService;
  constructor() {
    this.#accountService = new AccountService();
  }

  getAccountsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const account = await this.#accountService.getAccountsByUserId(userId);

    return ApiResponse.ok(
      new AccountDto(account),
      AccountMessages.Responses.FETCHED,
    ).send(res);
  });

  getAccountByUserIdAndProvider = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const provider = req.params.provider;

    const account = await this.#accountService.getAccountByUserIdAndProvider(
      userId,
      provider,
    );

    return ApiResponse.ok(
      new AccountDto(account),
      AccountMessages.Responses.FETCHED,
    ).send(res);
  });

  createAccountByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    const account = await this.#accountService.createAccountByUserId(
      userId,
      data,
    );

    return ApiResponse.created(
      new AccountDto(account),
      AccountMessages.Responses.CREATED,
    ).send(res);
  });

  deleteAccountByUserIdAndProvider = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const provider = req.params.provider;

    const account = await this.#accountService.deleteAccountByUserIdAndProvider(
      userId,
      provider,
    );

    return ApiResponse.ok(
      new AccountDto(account),
      AccountMessages.Responses.DELETED,
    ).send(res);
  });
}

export default new AccountController();
