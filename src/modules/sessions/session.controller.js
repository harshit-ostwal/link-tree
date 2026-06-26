import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { getRequestInfo } from "../../shared/utils/request.utils.js";
import { SessionDto } from "./session.dto.js";
import SessionMessages from "./session.messages.js";
import { SessionService } from "./session.service.js";

class SessionController {
  #sessionService;
  constructor() {
    this.#sessionService = new SessionService();
  }

  getSessionById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const session = await this.#sessionService.getSessionById(id);

    return ApiResponse.ok(
      new SessionDto(session),
      SessionMessages.Responses.FETCHED,
    ).send(res);
  });

  getSessionsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const sessions = await this.#sessionService.getSessionsByUserId(userId);

    return ApiResponse.ok(
      sessions.map((session) => new SessionDto(session)),
      SessionMessages.Responses.FETCHED_ALL,
    ).send(res);
  });

  createSessionByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    const { ipAddress, userAgent } = getRequestInfo(req);

    data.ipAddress = ipAddress;
    data.userAgent = userAgent;

    const session = await this.#sessionService.createSessionByUserId(
      userId,
      data,
    );

    return ApiResponse.created(
      new SessionDto(session),
      SessionMessages.Responses.CREATED,
    ).send(res);
  });

  updateSessionById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const { ipAddress, userAgent } = getRequestInfo(req);
    data.ipAddress = ipAddress;
    data.userAgent = userAgent;

    const session = await this.#sessionService.updateSessionById(id, data);

    return ApiResponse.ok(
      new SessionDto(session),
      SessionMessages.Responses.UPDATED,
    ).send(res);
  });

  deleteSessionById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    await this.#sessionService.deleteSessionById(userId, id);

    return ApiResponse.ok(null, SessionMessages.Responses.DELETED).send(res);
  });

  deleteSessionsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await this.#sessionService.deleteSessionsByUserId(userId);

    return ApiResponse.ok(null, SessionMessages.Responses.DELETED_ALL).send(
      res,
    );
  });
}

export default new SessionController();
