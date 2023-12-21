import { BookingDetails } from "../models/createBookingRequest";
import { faker } from "@faker-js/faker";

export class TestDataHelper {
  static generateRandomBookingDetailsData() {
    const bookingDetails: BookingDetails = {
      firstname: faker.person.firstName(),
      lastname: faker.person.firstName(),
      totalprice: Number(faker.finance.amount()),
      depositpaid: TestDataHelper.generateRandomBoolean(),
      bookingdates: TestDataHelper.generateRandomDateRangeForBookingDates(),
      additionalneeds: "Breakfast",
    };
    return bookingDetails;
  }

  static generateRandomBoolean(): boolean {
    return Math.random() < 0.5; // Adjust the threshold for your desired probability
  }

  // Custom function to generate a random date in "YYYY-MM-DD" format
  static generateRandomDateRangeForBookingDates() {
    const startDate = faker.date.between({
      from: new Date("2022-01-01"),
      to: new Date("2022-10-01"),
    });
    const endDate = faker.date.between({
      from: new Date("2023-01-01"),
      to: new Date("2023-10-01"),
    });

    const checkinDate = startDate.toISOString().split("T")[0];
    const checkoutDate = endDate.toISOString().split("T")[0];

    return { checkin: checkinDate, checkout: checkoutDate };
  }
}
