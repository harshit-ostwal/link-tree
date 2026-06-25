import prisma from "../../infrastructure/database/prisma.js";
import { AccountController } from "./account.controller.js";
import { AccountRepository } from "./account.repository.js";
import { AccountService } from "./account.service.js";

const accountRepository = new AccountRepository(prisma);
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

export { accountController, accountRepository, accountService };
