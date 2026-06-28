import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import LinkDto from "./link.dto.js";
import LinkMessages from "./link.messages.js";
import { LinkService } from "./link.service.js";

class LinkController {
  #linkService;
  constructor() {
    this.#linkService = new LinkService();
  }

  getLinkById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const link = await this.#linkService.getLinkById(id);

    return ApiResponse.ok(
      new LinkDto(link),
      LinkMessages.Responses.FETCHED,
    ).send(res);
  });

  getLinksByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const links = await this.#linkService.getLinksByUserId(userId);

    return ApiResponse.ok(
      links.map((link) => new LinkDto(link)),
      LinkMessages.Responses.FETCHED,
    ).send(res);
  });

  createLink = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const files = req.files;

    const link = await this.#linkService.createLink(userId, data, files);

    return ApiResponse.created(
      new LinkDto(link),
      LinkMessages.Responses.CREATED,
    ).send(res);
  });

  updateLink = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const files = req.files;

    const link = await this.#linkService.updateLink(id, data, files);

    return ApiResponse.ok(
      new LinkDto(link),
      LinkMessages.Responses.UPDATED,
    ).send(res);
  });

  updateLinksByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    const links = await this.#linkService.updateLinksByUserId(userId, data);

    return ApiResponse.ok(
      links.map((link) => new LinkDto(link)),
      LinkMessages.Responses.UPDATED,
    ).send(res);
  });

  deleteLink = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await this.#linkService.deleteLink(id);

    return ApiResponse.ok(null, LinkMessages.Responses.DELETED).send(res);
  });

  deleteLinksByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await this.#linkService.deleteLinksByUserId(userId);

    return ApiResponse.ok(null, LinkMessages.Responses.DELETED).send(res);
  });
}

export default new LinkController();
