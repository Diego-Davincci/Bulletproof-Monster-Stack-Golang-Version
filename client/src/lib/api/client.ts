// Provide methods to communicate with the API

import type { ApiRsp } from "@/types/common.types";
import { createNewApiError, type ApiError } from "../utils/helpers";

export const getHttpRequest = async <Response>(
  url: string
): Promise<Response> => {
  try {
    const req = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const rsp = (await req.json()) as ApiRsp<Response>;

    // Check if there's a server internal error, status code = 5xx
    if (rsp.statusCode >= 500) {
      const apiError = createNewApiError({
        errorTitle: "Something went wrong!",
        errorMsg: rsp.message,
        statusCode: rsp.statusCode,
      });
      throw apiError;
    }
    // Check is there was bad user input, status code = 4xx
    if (rsp.statusCode === 400) {
      const apiError = createNewApiError({
        errorTitle: "Bad input",
        errorMsg: rsp.message,
        statusCode: rsp.statusCode,
      });
      throw apiError;
    }

    return rsp.data;
  } catch (error) {
    const apiError = error as ApiError;
    console.error("HTTP Request went wrong: ", error);
    // If the error thrown has a "statusCode", it's a custome error
    if (apiError.statusCode) {
      throw apiError;
    }

    // Server is probably down
    const newApiError = createNewApiError({
      errorTitle: "Server is probably down!",
      errorMsg: "",
      statusCode: 500,
    });

    throw newApiError;
  }
};
