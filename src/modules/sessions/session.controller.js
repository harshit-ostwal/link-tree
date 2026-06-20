import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { SessionDto } from "./session.dto.js";
import { SessionService } from "./session.service.js";

class SessionController {
  #sessionService;
  constructor() {
    this.#sessionService = new SessionService();
  }

  getSessionById = asyncHandler(async (req, res) => {
    const sessionId = req.params.id;

    const session = await this.#sessionService.getSessionById(sessionId);

    return ApiResponse.ok(
      new SessionDto(session),
      "Session retrieved successfully"
    ).send(res);
  });

  getSessionsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const sessions = await this.#sessionService.getSessionsByUserId(userId);

    return ApiResponse.ok(
      sessions.map((session) => new SessionDto(session)),
      "Sessions retrieved successfully"
    ).send(res);
  });

  createSession = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    const session = await this.#sessionService.createSession(userId, data);

    return ApiResponse.created(
      new SessionDto(session),
      "Session created successfully"
    ).send(res);
  });

  updateSession = asyncHandler(async (req, res) => {
    const sessionId = req.params.id;
    const data = req.body;

    const session = await this.#sessionService.updateSession(sessionId, data);

    return ApiResponse.ok(
      new SessionDto(session),
      "Session updated successfully"
    ).send(res);
  });

  deleteSession = asyncHandler(async (req, res) => {
    const sessionId = req.params.id;
    const userId = req.user.id;

    await this.#sessionService.deleteSession(userId, sessionId);

    return ApiResponse.noContent("Session deleted successfully.").send(res);
  });

  deleteSessionsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await this.#sessionService.deleteSessionsByUserId(userId);

    return ApiResponse.noContent("Sessions deleted successfully.").send(res);
  });
}

export default new SessionController();
