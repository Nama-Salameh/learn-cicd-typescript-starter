import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns null when no authorization header is present", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header does not start with ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer 12345",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when ApiKey header is malformed", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns the API key when header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });
});
