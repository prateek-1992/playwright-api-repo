import { APIRequestContext, expect, test } from "@playwright/test";
import { BaseRequest } from "../apiUtils/baseRequest";
import { BookingResponse } from "../models/createBookingResponse";
import { BookingDetails } from "../models/createBookingRequest";
import { ResponseValidator } from "./responseValidator";
import { EndPoints } from "../constants/endpoints";

export class CreateBookingHelper extends BaseRequest {
  constructor(readonly request: APIRequestContext) {
    super(request);
  }

  async createNewBookingByApi(bookingDetails: BookingDetails) {
    let bookingId;
    await test.step(`Creating new booking using APIs`, async () => {
      const createBoookingResp = await this.triggerPostAPICall(
        EndPoints.CREATE_BOOKING_ENDPOINT,
        {
          data: bookingDetails,
        }
      );
      let responseValidator = new ResponseValidator(createBoookingResp);

      await responseValidator.runBasicValidationOnResponse({
        expectedStatusCode: 200,
        expectingBodyToBePresent: true,
      });

      const createBoookingRespJson: BookingResponse =
        await responseValidator.getResponseAsJson();

      console.log(`Booking id is ${createBoookingRespJson.bookingid}`);

      expect(
        createBoookingRespJson.booking.firstname,
        `expecting first name to match : ${bookingDetails.firstname}`
      ).toBe(bookingDetails.firstname);

      //retrieving the booking ID
      bookingId = createBoookingRespJson.bookingid;
    });

    return bookingId;
  }
}
