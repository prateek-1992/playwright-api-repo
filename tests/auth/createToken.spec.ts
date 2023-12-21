import { test, expect } from "@playwright/test";
import { AuthHelper } from "../../apiUtils/authApiUtil";
import { SuiteTags } from "../../constants/suiteTags";

test.describe(`${SuiteTags.AUTH}`, async () => {
  let authHelper: AuthHelper;
  test.beforeEach(async ({ request }) => {
    authHelper = new AuthHelper(request);
  });
  test(`TC001: Verify we are able to generate user token using API`, async () => {
    await test.step(`Generating user token by API and setting it as env variable`, async () => {
      const userToken = await authHelper.getAuthTokenForUser(
        process.env.username!,
        process.env.password!
      );
      expect(
        userToken.length,
        `expecting user token to have length greater than 1`
      ).toBeGreaterThan(1);
      //setting the generated usertoken as the env variable
      process.env.authToken = userToken;
    });
  });
});
