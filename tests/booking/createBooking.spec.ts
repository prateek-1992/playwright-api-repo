import test, { expect } from "@playwright/test";
import { CreateBookingHelper } from "../../apiUtils/createBookingApiUtil";
import { GetBookingHelper } from "../../apiUtils/getBookingAPIUtil";
import { TestDataHelper } from "../../helpers/testDataHelper";
import { SuiteTags } from "../../constants/suiteTags";

test.describe(`${SuiteTags.CREATE_BOOKING}`, async () => {
  let createBookingHelper: CreateBookingHelper;
  let getBookingHelper: GetBookingHelper;
  test.beforeEach(async ({ request }) => {
    createBookingHelper = new CreateBookingHelper(request);
    getBookingHelper = new GetBookingHelper(request);
  });

  test(`TC001 verify we are able to create new booking using API`, async () => {
    const bookingDetailsToAdd =
      TestDataHelper.generateRandomBookingDetailsData();
    const bookingId = await createBookingHelper.createNewBookingByApi(
      bookingDetailsToAdd
    );
    const retrievedBookingDetails =
      await getBookingHelper.retrieveBookingDetailsById(bookingId);

    expect(
      retrievedBookingDetails.firstname,
      `validating that retrieved booking details reflect first name as ${bookingDetailsToAdd.firstname}`
    ).toBe(bookingDetailsToAdd.firstname);
  });
});
