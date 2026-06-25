import prisma from "../../infrastructure/database/prisma.js";
import { SessionController } from "./session.controller.js";
import { SessionRepository } from "./session.repository.js";
import { SessionService } from "./session.service.js";

const sessionRepository = new SessionRepository(prisma);
const sessionService = new SessionService(sessionRepository);
const sessionController = new SessionController(sessionService);

export { sessionController, sessionRepository, sessionService };
