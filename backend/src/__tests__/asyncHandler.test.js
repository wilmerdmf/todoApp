const asyncHandler = require("../utils/asyncHandler");

const mockReq = {};
const mockRes = {};

describe("asyncHandler", () => {
  it("should call the wrapped function with req, res and next", async () => {
    const fn = jest.fn().mockResolvedValue(null);
    const wrapped = asyncHandler(fn);

    const next = jest.fn();
    await wrapped(mockReq, mockRes, next);

    expect(fn).toHaveBeenCalledWith(mockReq, mockRes, next);
  });

  it("should not call next when the function resolves successfully", async () => {
    const fn = jest.fn().mockResolvedValue("ok");
    const wrapped = asyncHandler(fn);

    const next = jest.fn();
    await wrapped(mockReq, mockRes, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with the error when the function rejects", async () => {
    const error = new Error("Something went wrong");
    const fn = jest.fn().mockRejectedValue(error);
    const wrapped = asyncHandler(fn);

    const next = jest.fn();
    await wrapped(mockReq, mockRes, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("should call next with the error when the async function throws", async () => {
    const error = new Error("Thrown error");
    const fn = jest.fn().mockImplementation(async () => {
      throw error;
    });
    const wrapped = asyncHandler(fn);

    const next = jest.fn();
    await wrapped(mockReq, mockRes, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("should return a function", () => {
    const fn = jest.fn();
    const wrapped = asyncHandler(fn);

    expect(typeof wrapped).toBe("function");
  });
});
