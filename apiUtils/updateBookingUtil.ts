import { APIRequestContext, expect, test } from "@playwright/test";
import { BaseRequest } from "./baseRequest";
import { BookingResponse } from "../models/createBookingResponse";
import { BookingDetails } from "../models/createBookingRequest";
import { AuthHelper } from "./authApiUtil";
import { ResponseValidator } from "./responseValidator";
import { EndPoints } from "../constants/endpoints";

export class UpdateBookingUtil extends BaseRequest {
  constructor(readonly request: APIRequestContext) {
    super(request);
  }

  async updateExistingBookingByApi(
    bookingId: number,
    bookingDetails: BookingDetails
  ) {
    let updateBoookingRespJson: BookingDetails;
    await test.step(`Updating existing bookind id : ${bookingId} with new details`, async () => {
      const updateBoookingResp = await this.triggerPutAPICall(
        `${EndPoints.UPDATE_BOOKING_ENDPOINT}/${bookingId}`,
        {
          needAuth: true,
          data: bookingDetails,
        }
      );
      let responseValidator = new ResponseValidator(updateBoookingResp);
      await responseValidator.runBasicValidationOnResponse({
        expectedStatusCode: 200,
        expectingBodyToBePresent: true,
      });
      updateBoookingRespJson = await responseValidator.getResponseAsJson();
    });
    return updateBoookingRespJson!;
  }
}
