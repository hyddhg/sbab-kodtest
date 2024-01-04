import { useEffect, useState, useCallback } from "react";
import HttpError from "./HttpError";
import Logger, { LogLevel } from "../utils/logger";

/**
 * The base part of the URL.
 * In test the base is an empty string.
 * On a deployed live server the base is /api,
 * it uses the same base URL for both front end and back end.
 * On a developer server the base is process.env.API_URL.
 */
const baseUrl =
  process.env.NODE_ENV === "test" ? "" : process.env.API_URL || "/api";

/**
 * The current state of the api
 * Initial -> Loading (-> Error | Completed) -> Initial
 */
enum ApiFetchState {
  Initial,
  Loading,
  Error,
  Completed,
}

export type FetchOptionsType = {
  method?: string;
  headers?: { [key: string]: string };
  body?: string;
};

export interface RequestType<RequestDataType> extends FetchOptionsType {
  url: string;
  token?: string;
  data?: RequestDataType;
}

export type ResponseType<ResponseDataType> = {
  data: ResponseDataType;
  status: number;
  statusText: string | null;
  token?: string;
};

export type ApiHookState<Response> = {
  response: ResponseType<Response>;
};

/**
 * Create the fetch options.
 * @param request The request containing the url, method and more.
 * @returns Options to be used with fetch.
 */
const createFetchOptions = <DataType>(request?: RequestType<DataType>) => {
  if (request === undefined) return {};

  const sessionToken = window.sessionStorage.getItem("fetchToken");

  const { method = "get", headers = {}, data, token } = request;

  const authHeader: { [key: string]: string } =
    token || sessionToken
      ? { Authorization: `Bearer ${token || sessionToken}` }
      : {};

  const fetchOptions: FetchOptionsType = {
    method,
    headers: { ...authHeader, ...headers },
  };

  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }

  if (
    data &&
    fetchOptions.headers &&
    !Object.values(fetchOptions.headers).some(
      (header) => header.toLowerCase() === "content-type"
    )
  ) {
    fetchOptions.headers["content-type"] = "application/json";
  }

  return fetchOptions;
};

/**
 * Call the backend and have something to react on.
 * @param initialData this api holds data like a useState. This can be accessed from the response and request-values in the return value.
 * @param initialOptions Optional. If you want the API to fetch immediately, specify { method, url, request }. The method
 *       defaults to GET. The API is setup to automatically react to updates via setRequest.
 * @returns Returns a typed object. The parsed API response-data is not automatically validated to follow the type definition.
 *
 * The request (url and method) represents the data that should be fetched from the backend using the GET/POST/PUT/DELETE verbs,
 *       before anything is fetched or if the request has failed, a new response object will be created. The initialData object
 *       or value will be used.
 * response.data -  theReturnValueFromTheApi OR initialData
 * response.statusText - a value that describes a low level technical representation of the request status or an error-state.
 * response.errorMessage - a value that describes a more user-friendy representation of an error.
 * response.isLoading, response.hasError and response.hasCompleted - reflects the internal hook state of the api fetches
 *       Initial -> Loading (-> Error | Completed) -> Initial
 *
 * Api options - the current options as specifyed by initialOptions or setRequest
 * - setRequest - changes the initialOptions: { url, method, headers }
 *              - this will not do anything if the options are the same as last time
 * - reload - when you want to make the exact same fetch again
 * - reset - Reset the api except the data returned.
 * - resetAll - Reset the entire api to it's initial state.
 *
 * Show a loader - isLoading
 * Use the result - hasCompleted
 * Report or react to an error - hasError
 * Use the data - When hasCompleted is true, use the response.data object to show or update the page
 */
const useApi = <RequestDataType, ResponseDataType>(
  initialData: ResponseDataType,
  initialOptions?: RequestType<RequestDataType>
) => {
  const [response, setResponse] = useState<ResponseType<ResponseDataType>>({
    data: initialData,
    status: 0,
    statusText: null,
  });

  const [request, setRequest] = useState(initialOptions);
  const [apiState, setApiState] = useState(ApiFetchState.Initial);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /** Reset everything to the initial state. */
  const resetAll = useCallback(() => {
    setRequest({ url: "" });
    setApiState(ApiFetchState.Initial);
    setResponse({
      data: initialData,
      status: 0,
      statusText: null,
    });
    setErrorMessage(null);
  }, [initialData]);

  /** Reset everything except the data. */
  const reset = useCallback(() => {
    setRequest({ url: "" });
    setApiState(ApiFetchState.Initial);
    setResponse((oldResponse) => ({
      ...oldResponse,
      status: 0,
      statusText: null,
    }));
    setErrorMessage(null);
  }, []);

  // This effect looks for changes in options; url and method.
  // Then it starts to fetch from the server with the options you have set.
  // Then it checks the result.
  useEffect(() => {
    let didCancel = false;

    const url = request?.url || "";

    const fetchData = async () => {
      try {
        setApiState(ApiFetchState.Loading);

        const fetchOptions = createFetchOptions<RequestDataType>(request);
        const fetchResponse = await fetch(`${baseUrl}/${url}`, fetchOptions);

        const { status, statusText } = fetchResponse;

        if (status < 200 || status > 299) {
          throw new HttpError(
            `Http request failed (status ${status}).`,
            status
          );
        }

        const hasResponse = fetchResponse.headers
          .get("content-type")
          ?.includes("application/json");

        const responseData = hasResponse ? await fetchResponse.json() : null;
        setResponse({
          data: responseData,
          status,
          statusText,
        });
        setErrorMessage(null);
        setApiState(ApiFetchState.Completed);
      } catch (error) {
        if (didCancel) {
          return;
        }

        const setErrorState = (
          newErrorMessage: string,
          status: number,
          statusText: string
        ) => {
          setErrorMessage(newErrorMessage);
          setApiState(ApiFetchState.Error);
          Logger(LogLevel.Error, statusText);
        };

        if (error instanceof HttpError) {
          setErrorState(
            "An error has occured, try reloading the page or come back later!",
            error.code,
            `HttpError in useApi: code: ${error.code}, message: ${error.message}`
          );
        } else if (error instanceof Error) {
          setErrorState(
            "An error has occured, try reloading the page or come back later!",
            0,
            `Error in useApi: name: ${error.name}, message: ${error.message}`
          );
        } else {
          setErrorState(
            "An error has occured, try reloading the page or come back later!",
            0,
            `Unknown error in useApi: ${JSON.stringify(error)}`
          );
        }
      }
    };

    if (url.length > 0) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [request]);

  return {
    request,
    response,
    reset,
    resetAll,
    setRequest,
    errorMessage,
    isLoading: apiState === ApiFetchState.Loading,
    hasError: apiState === ApiFetchState.Error,
    hasCompleted: apiState === ApiFetchState.Completed,
  };
};

export default useApi;
