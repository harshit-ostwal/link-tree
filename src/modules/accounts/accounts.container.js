import { AccountController } from "./account.controller.js";
import { AccountService } from "./account.service.js";

const accountService = new AccountService();
const accountController = new AccountController(accountService);

export { accountController, accountService };
