import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { AccountDto } from "./account.dto.js";
import AccountMessages from "./account.messages.js";
import { AccountService } from "./account.service.js";

class AccountController {
  #accountService;
  /**
   * @param {AccountService} accountService
   */
  constructor(accountService) {
    this.#accountService = accountService;
  }

  getAccountById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const account = await this.#accountService.getAccountById(id);

    return ApiResponse.ok(
      new AccountDto(account),
      AccountMessages.Responses.FETCHED
    ).send(res);
  });

  getAccountsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const account = await this.#accountService.getAccountsByUserId(userId);

    return ApiResponse.ok(
      new AccountDto(account),
      AccountMessages.Responses.FETCHED
    ).send(res);
  });

  getAccountByProviderAndProviderId = asyncHandler(async (req, res) => {
    const provider = req.params.provider;
    const providerId = req.params.providerId;

    const account =
      await this.#accountService.getAccountByProviderAndProviderId(
        provider,
        providerId
      );

    return ApiResponse.ok(
      new AccountDto(account),
      AccountMessages.Responses.FETCHED
    ).send(res);
  });

  getAccountByUserIdAndProvider = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const provider = req.params.provider;

    const account = await this.#accountService.getAccountByUserIdAndProvider(
      userId,
      provider
    );

    return ApiResponse.ok(
      new AccountDto(account),
      AccountMessages.Responses.FETCHED
    ).send(res);
  });

  createAccountByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    const account = await this.#accountService.createAccountByUserId(
      userId,
      data
    );

    return ApiResponse.created(
      new AccountDto(account),
      AccountMessages.Responses.CREATED
    ).send(res);
  });

  updateAccountById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const account = await this.#accountService.updateAccountById(id, data);

    return ApiResponse.ok(
      new AccountDto(account),
      AccountMessages.Responses.UPDATED
    ).send(res);
  });

  deleteAccountById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const account = await this.#accountService.deleteAccountById(id);

    return ApiResponse.ok(
      new AccountDto(account),
      AccountMessages.Responses.DELETED
    ).send(res);
  });

  deleteAccountsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const accounts = await this.#accountService.deleteAccountsByUserId(userId);

    return ApiResponse.ok(
      accounts.map((account) => new AccountDto(account)),
      AccountMessages.Responses.DELETED
    ).send(res);
  });
}

export { AccountController };
