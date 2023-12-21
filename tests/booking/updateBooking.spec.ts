import { test, expect } from "@playwright/test";
import { CreateBookingHelper } from "../../apiUtils/createBookingApiUtil";
import { GetBookingHelper } from "../../apiUtils/getBookingAPIUtil";
import { TestDataHelper } from "../../helpers/testDataHelper";
import { UpdateBookingUtil } from "../../apiUtils/updateBookingUtil";
import { SuiteTags } from "../../constants/suiteTags";

test.describe(`${SuiteTags.UPDATE_BOOKING}`, async () => {
  let createBookingHelper: CreateBookingHelper;
  let getBookingHelper: GetBookingHelper;
  let updateBookingHelper: UpdateBookingUtil;

  test.beforeEach(async ({ request }) => {
    createBookingHelper = new CreateBookingHelper(request);
    getBookingHelper = new GetBookingHelper(request);
    updateBookingHelper = new UpdateBookingUtil(request);
  });

  test(`TC001 verify we are able to update existing booking details using API`, async () => {
    const bookingDetailsToAdd =
      TestDataHelper.generateRandomBookingDetailsData();
    const bookingId = await createBookingHelper.createNewBookingByApi(
      bookingDetailsToAdd
    );
    const bookingDetailsToUpdate =
      TestDataHelper.generateRandomBookingDetailsData();

    const updatedBookingDetails =
      await updateBookingHelper.updateExistingBookingByApi(
        bookingId,
        bookingDetailsToUpdate
      );
    expect(
      updatedBookingDetails.firstname,
      `expecting updated booking details to reflect first name as ${bookingDetailsToAdd.firstname}`
    ).toBe(bookingDetailsToUpdate.firstname);
  });
});
