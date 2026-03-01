import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns null when no authorization header is present", () => {
    const headers: IncomingHttpHeaders = {};

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("returns null when authorization header does not start with ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer 12345",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("returns null when ApiKey header is malformed", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("returns the API key when header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };

    const result = getAPIKey(headers);

    expect(result).toBe("my-secret-key");
  });

  test("returns the correct key when multiple spaces exist", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey    another-key",
    };

    const result = getAPIKey(headers);

    expect(result).toBe("another-key");
  });
});