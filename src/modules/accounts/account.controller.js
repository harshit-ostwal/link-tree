import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { AccountCreateDto, AccountDto } from "./account.dto.js";
import { AccountService } from "./account.service.js";

class AccountController {
  #accountService;

  constructor(service = new AccountService()) {
    this.#accountService = service;
  }

  getAccountById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const account = await this.#accountService.getAccountById(id);

    return ApiResponse.ok(
      new AccountDto(account),
      "Account retrieved successfully"
    ).send(res);
  });

  getAccountsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const accounts = await this.#accountService.getAccountsByUserId(userId);

    return ApiResponse.ok(
      accounts.map((account) => new AccountDto(account)),
      "Accounts retrieved successfully"
    ).send(res);
  });

  getAccountByProviderAndProviderId = asyncHandler(async (req, res) => {
    const providerId = req.params.providerId;
    const provider = req.params.provider;

    const account =
      await this.#accountService.getAccountByProviderAndProviderId(
        provider,
        providerId
      );

    return ApiResponse.ok(
      new AccountDto(account),
      "Account retrieved successfully"
    ).send(res);
  });

  createAccount = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    const account = await this.#accountService.createAccount(userId, data);

    return ApiResponse.created(
      new AccountCreateDto(account),
      "Account created successfully"
    ).send(res);
  });

  deleteAccount = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await this.#accountService.deleteAccount(id);

    return ApiResponse.noContent("Account deleted successfully").send(res);
  });

  deleteAccountsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await this.#accountService.deleteAccountsByUserId(userId);

    return ApiResponse.noContent("Accounts deleted successfully").send(res);
  });
}

export default new AccountController();
