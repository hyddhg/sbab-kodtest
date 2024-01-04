import { renderHook, waitFor } from "@testing-library/react";
import fetchMock from "fetch-mock-jest";
import { act } from "react-dom/test-utils";
import StorageMock from "../mocks/StorageMock";
import { LogLevel } from "../utils/logger";
import useApi, { RequestType } from "./useApi";

Object.defineProperty(window, "sessionStorage", {
  value: new StorageMock(),
});

const responseData1 = {
  name: "Test 1 åäö",
  description: "Ett test med lite olika parametrar. åäö",
  numberOfTests: 101,
  list: ["ett"],
};

const responseData2 = {
  name: "Test 2 åäö",
  description: "Två test med lite olika parametrar. åäö",
  numberOfTests: 202,
  list: ["två", "två"],
};

type RequestDataType = {
  id: number;
  name: string;
  description: string;
  list: number[];
};

const initialData1 = {
  id: 0,
  name: "initial data",
  description: "Initial data innan apiet har anropats",
  list: [0],
};

const requestData1 = {
  id: 1,
  name: "Test av request data 1 åäö",
  description: "Ett test av utdata 1 med lite olika parametrar. åäö",
  list: [1],
};

const url1 = "detta_är_url_1/som_blev_lite_längre";
const url2 = "detta_är_url_2/som_blev_lite_annorlunda";
const token1 = "DFGJODSJOGSDEOJSGOJDG1234";
const token2 = "LSDKJFSJO8934FLKWJE4389FX";

const postOptions1: RequestType<RequestDataType> = {
  url: url1,
  token: token1,
  data: requestData1,
  method: "post",
};

const getOptionsNoToken1: RequestType<RequestDataType> = {
  url: url1,
};

const getOptions2: RequestType<RequestDataType> = {
  url: url2,
  token: token2,
  method: "get",
};

describe("useApi", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("should succeed", async () => {
    fetchMock.postOnce(/.*/, {
      body: JSON.stringify(responseData2),
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });

    // Call the hook
    const { result } = renderHook(() => useApi(initialData1, postOptions1));

    expect(result.current.response.data).toBe(initialData1);

    await waitFor(() => expect(result.current.hasCompleted).toBe(true));

    // Get the result
    const {
      request,
      response,
      isLoading,
      hasError,
      errorMessage,
      hasCompleted,
    } = result.current;

    // Check the result
    expect(typeof request).toBe("object");
    expect(typeof response).toBe("object");
    expect(typeof errorMessage).toBe("object");
    expect(typeof isLoading).toBe("boolean");
    expect(typeof hasError).toBe("boolean");
    expect(typeof hasCompleted).toBe("boolean");

    expect(response.data).toEqual(responseData2);

    expect(errorMessage).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(hasError).toEqual(false);
    expect(hasCompleted).toEqual(true);
  });

  it("should use token from sessionStorage", async () => {
    window.sessionStorage.setItem("fetchToken", token2);

    fetchMock.getOnce(/.*/, {
      body: JSON.stringify(responseData1),
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });

    // Call the hook
    const { result } = renderHook(() =>
      useApi(initialData1, getOptionsNoToken1)
    );

    await waitFor(() => expect(result.current.hasCompleted).toBe(true));

    expect(fetchMock.lastOptions()).toStrictEqual({
      headers: {
        Authorization: `Bearer ${token2}`,
      },
      method: "get",
    });
  });

  it("should use token from parameter", async () => {
    window.sessionStorage.setItem("fetchToken", token1);

    fetchMock.getOnce(/.*/, {
      body: JSON.stringify(responseData1),
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });

    // Call the hook
    const { result } = renderHook(() => useApi(initialData1, getOptions2));

    await waitFor(() => expect(result.current.hasCompleted).toBe(true));

    expect(fetchMock.lastOptions()).toStrictEqual({
      headers: {
        Authorization: `Bearer ${token2}`,
      },
      method: "get",
    });
  });

  it("should fail", async () => {
    process.env.LOG_LEVEL = LogLevel.Off;
    fetchMock.getOnce(/.*/, {
      body: responseData2,
      status: 300,
      headers: {
        "content-type": "application/json",
      },
    });

    // Call the hook
    const { result, rerender } = renderHook(() => useApi(initialData1));

    act(() => {
      result.current.setRequest(getOptions2);
    });

    act(() => rerender());

    await waitFor(() => expect(result.current.hasError).toBe(true));

    // Check the result
    const { response, isLoading, hasError, errorMessage, hasCompleted } =
      result.current;

    expect(response.data).toEqual(initialData1);

    expect(errorMessage).toEqual(
      "An error has occured, try reloading the page or come back later!"
    );
    expect(isLoading).toEqual(false);
    expect(hasError).toEqual(true);
    expect(hasCompleted).toEqual(false);
  });

  it("should setRequest * 2", async () => {
    const { result, rerender } = renderHook(() => useApi(initialData1));

    // Call setRequest the first time
    fetchMock.getOnce(/.*/, {
      body: JSON.stringify(responseData1),
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });

    act(() => {
      result.current.setRequest(getOptions2);
    });

    act(() => rerender());

    await waitFor(() => expect(result.current.hasCompleted).toBe(true));

    // Call setRequest the second time
    fetchMock.restore();
    fetchMock.postOnce(
      /.*/,
      {
        body: JSON.stringify(responseData2),
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      },
      { overwriteRoutes: true }
    );

    act(() => {
      result.current.setRequest(postOptions1);
    });

    expect(result.current.hasCompleted).toBe(false);

    act(() => rerender());

    await waitFor(() => expect(result.current.hasCompleted).toBe(true));

    expect(result.current.response.data).toStrictEqual(responseData2);
  });

  it("should resetAll", async () => {
    const { result } = renderHook(() => useApi(initialData1));

    // Call setRequest the first time
    fetchMock.getOnce(/.*/, {
      body: responseData1,
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });

    act(() => {
      result.current.setRequest(getOptions2);
    });

    await waitFor(() => expect(result.current.hasCompleted).toBe(true));

    fetchMock.restore();
    fetchMock.getOnce(
      /.*/,
      {
        body: responseData2,
        status: 200,
      },
      { overwriteRoutes: true }
    );

    // resetAll
    act(() => {
      result.current.resetAll();
    });

    // Call it again
    act(() => {
      result.current.setRequest(getOptions2);
    });

    // Wait for the hook to succeed
    await waitFor(() => expect(result.current.hasCompleted).toEqual(true));

    // Check the result
    expect(result.current.response.data).toEqual(responseData2);

    expect(result.current.errorMessage).toEqual(null);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.hasError).toEqual(false);
    expect(result.current.hasCompleted).toEqual(true);
  });

  it("should reset", async () => {
    const { result } = renderHook(() => useApi(initialData1));

    // Call setRequest the first time
    fetchMock.getOnce(/.*/, {
      body: responseData1,
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });

    act(() => {
      result.current.setRequest(getOptions2);
    });

    await waitFor(() => expect(result.current.hasCompleted).toBe(true));

    // reset
    act(() => {
      result.current.reset();
    });

    // Check the result
    expect(result.current.response.data).toEqual(responseData1);

    expect(result.current.errorMessage).toEqual(null);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.hasError).toEqual(false);
    expect(result.current.hasCompleted).toEqual(false);
  });
});
