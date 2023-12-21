import { APIRequestContext, test } from "@playwright/test";
import { BaseRequest } from "./baseRequest";
import { BookingDetails } from "../models/createBookingRequest";
import { ResponseValidator } from "./responseValidator";
import { EndPoints } from "../constants/endpoints";

export class GetBookingHelper extends BaseRequest {
  constructor(readonly request: APIRequestContext) {
    super(request);
  }

  async retrieveBookingDetailsById(bookingId: number) {
    let retrievedBookingDetails: BookingDetails;
    await test.step(`Triggering API call to retrieve booking details by id : ${bookingId}`, async () => {
      const getBookingDetailsResp = await this.triggerGetCall(
        `${EndPoints.GET_BOOKING_ENDPOINT}/${bookingId}`
      );
      let responseValidator = new ResponseValidator(getBookingDetailsResp);
      await responseValidator.runBasicValidationOnResponse({
        expectedStatusCode: 200,
      });
      retrievedBookingDetails = await responseValidator.getResponseAsJson();
    });

    return retrievedBookingDetails!;
  }
}
