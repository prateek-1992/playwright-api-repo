import { APIResponse, expect, test } from "@playwright/test";

export class ResponseValidator {
  constructor(readonly response: APIResponse) {
    this.response = response;
  }

  async runBasicValidationOnResponse(validationOptions: {
    expectedStatusCode: number;
    expectingBodyToBePresent?: boolean;
  }) {
    await test.step(`Running basic validation on the response recieved`, async () => {
      //validating status code
      expect(
        this.response.status(),
        `expecting response api status code to be ${validationOptions.expectedStatusCode}`
      ).toBe(validationOptions.expectedStatusCode);

      //validating that the body is not null
      if (validationOptions.expectingBodyToBePresent) {
        const responseBody = await this.response.body();
        expect(
          responseBody,
          `expecting response body to be not null`
        ).not.toBeNull();
      }
    });
  }

  async getResponseAsJson() {
    let responseAsJson;
    await test.step(`Converting response as Json`, async () => {
      responseAsJson = await this.response.json();
    });
    return responseAsJson;
  }
}
