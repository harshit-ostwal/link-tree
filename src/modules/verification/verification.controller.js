import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import VerificationMessages from "./verification.messages.js";
import { VerificationService } from "./verification.service.js";

class VerificationController {
  #verificationService;
  constructor() {
    this.#verificationService = new VerificationService();
  }

  getVerificationById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const verification =
      await this.#verificationService.getVerificationById(id);

    return ApiResponse.ok(
      new VerificationDto(verification),
      VerificationMessages.Responses.FETCHED,
    ).send(res);
  });

  getVerificationByIdentifierAndType = asyncHandler(async (req, res) => {
    const identifier = req.params.identifier;
    const type = req.params.type;

    const verification =
      await this.#verificationService.getVerificationByIdentifierAndType(
        identifier,
        type,
      );

    return ApiResponse.ok(
      new VerificationDto(verification),
      VerificationMessages.Responses.FETCHED,
    ).send(res);
  });
}

export default new VerificationController();
