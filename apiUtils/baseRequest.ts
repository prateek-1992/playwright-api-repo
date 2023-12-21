import { APIRequestContext, APIResponse, test, expect } from "@playwright/test";
import { ResponseValidator } from "./responseValidator";

export class BaseRequest {
  constructor(readonly request: APIRequestContext) {
    this.request = request;
  }

  baseHeaders = {
    "Content-type": "application/json",
  };

  authHeaders = {
    "Content-type": "application/json",
    Cookie: `token=${process.env.authToken}`,
  };
  async triggerPostAPICall(
    endpoint: string,
    options: {
      headers?;
      data?;
      params?;
    }
  ): Promise<APIResponse> {
    let postApiResp: APIResponse;
    await test.step(`Going to trigger post request for endpoint : ${endpoint}`, async () => {
      postApiResp = await this.request.post(endpoint, {
        data: options.data ? options.data : undefined,
        headers: options.headers ? options.headers : this.baseHeaders,
        params: options.params ? options.params : undefined,
      });
    });

    return postApiResp!;
  }

  async triggerGetCall(
    endpoint: string,
    options?: {
      headers?;
      params?;
    }
  ) {
    let getApiResp: APIResponse;
    await test.step(`Triggering Get API call for endpoint : ${endpoint}`, async () => {
      getApiResp = await this.request.get(endpoint, {
        params: options?.params ? options.params : undefined,
        headers: options?.headers ? options.headers : this.baseHeaders,
      });
    });
    return getApiResp!;
  }

  async triggerPatchCall() {}

  async triggerPutAPICall(
    endpoint: string,
    options: {
      needAuth?: boolean;
      headers?;
      data?;
      params?;
    }
  ): Promise<APIResponse> {
    let putApiResp: APIResponse;
    await test.step(`Going to trigger PUT request for endpoint : ${endpoint}`, async () => {
      console.log(`The auth token is : ${process.env.authToken}`);
      putApiResp = await this.request.put(endpoint, {
        data: options.data ? options.data : undefined,
        headers:
          options.needAuth && !options.headers
            ? this.authHeaders
            : options.headers,
        params: options.params ? options.params : undefined,
      });
    });

    await test.step(`Validating the API Response code and expecting it to be 200`, async () => {
      expect(
        putApiResp.status(),
        `expecting PUT API Response to return 200`
      ).toBe(200);
    });
    return putApiResp!;
  }

  async triggerDeleteCall() {}
}
