import { APIRequestContext, test } from "@playwright/test";
import { BaseRequest } from "../apiUtils/baseRequest";
import { AuthTokenModelResponse } from "../models/authTokenResponse";
import { ResponseValidator } from "./responseValidator";
import { EndPoints } from "../constants/endpoints";

export class AuthHelper extends BaseRequest {
  constructor(readonly request: APIRequestContext) {
    super(request);
  }

  async getAuthTokenForUser(userName: string, userPassword: string) {
    let userToken: string = "";
    await test.step(`Fetching user token by API for user: ${userName}`, async () => {
      let userTokenResp = await this.triggerPostAPICall(
        EndPoints.GET_USER_TOKEN,
        {
          data: { username: userName, password: userPassword },
        }
      );

      let responseValidator: ResponseValidator = new ResponseValidator(
        userTokenResp
      );
      await responseValidator.runBasicValidationOnResponse({
        expectedStatusCode: 200,
        expectingBodyToBePresent: true,
      });
      const userTokenRespJson: AuthTokenModelResponse =
        await responseValidator.getResponseAsJson();

      userToken = userTokenRespJson.token;
      console.log(
        `The token fetched from the API response is ${userTokenRespJson.token}`
      );
    });
    return userToken;
  }

  async getAuthTokenForAdmin() {
    let userToken: string = "";
    await test.step(`Fetching user token by API for admin: ${process.env.username}`, async () => {
      let userTokenResp = await this.triggerPostAPICall(
        EndPoints.GET_USER_TOKEN,
        {
          data: {
            username: process.env.username,
            password: process.env.password,
          },
        }
      );
      const userTokenRespJson: AuthTokenModelResponse =
        await userTokenResp.json();
      userToken = userTokenRespJson.token;
      console.log(
        `The token fetched from the API response is ${userTokenRespJson.token}`
      );
    });
    return userToken;
  }
}
