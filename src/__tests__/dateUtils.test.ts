import { describe, it, expect } from "vitest";
import {
  parseDisplayDate,
  parseInputDate,
  formatToDisplay,
  formatToInput,
  getTodayDate,
  getTodayDisplay,
  getTodayInput,
  convertToDisplay,
  convertToInput,
} from "@/utils/dateUtils";
import { DATE_FORMATS } from "@/constants";

describe("parseDisplayDate", () => {
  it("should parse a valid display date string to a Date object", () => {
    const result = parseDisplayDate("12/31/2030");
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2030);
    expect(result?.getMonth()).toBe(11);
    expect(result?.getDate()).toBe(31);
  });

  it("should return null for an empty string", () => {
    expect(parseDisplayDate("")).toBeNull();
  });

  it("should return null for EMPTY_VALUE constant", () => {
    expect(parseDisplayDate(DATE_FORMATS.EMPTY_VALUE)).toBeNull();
  });

  it("should return null for EMPTY_DISPLAY constant", () => {
    expect(parseDisplayDate(DATE_FORMATS.EMPTY_DISPLAY)).toBeNull();
  });

  it("should return null for an invalid date string", () => {
    expect(parseDisplayDate("not-a-date")).toBeNull();
  });

  it("should return a date with time set to 00:00:00", () => {
    const result = parseDisplayDate("12/31/2030");
    expect(result?.getHours()).toBe(0);
    expect(result?.getMinutes()).toBe(0);
    expect(result?.getSeconds()).toBe(0);
  });
});

describe("parseInputDate", () => {
  it("should parse a valid input date string to a Date object", () => {
    const result = parseInputDate("2030-12-31");
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2030);
    expect(result?.getMonth()).toBe(11);
    expect(result?.getDate()).toBe(31);
  });

  it("should return null for an empty string", () => {
    expect(parseInputDate("")).toBeNull();
  });

  it("should return null for EMPTY_VALUE constant", () => {
    expect(parseInputDate(DATE_FORMATS.EMPTY_VALUE)).toBeNull();
  });

  it("should return null for an invalid date string", () => {
    expect(parseInputDate("not-a-date")).toBeNull();
  });

  it("should return a date with time set to 00:00:00", () => {
    const result = parseInputDate("2030-12-31");
    expect(result?.getHours()).toBe(0);
    expect(result?.getMinutes()).toBe(0);
    expect(result?.getSeconds()).toBe(0);
  });
});

describe("formatToDisplay", () => {
  it("should format a Date object to MM/dd/yyyy", () => {
    const date = new Date(2030, 11, 31);
    expect(formatToDisplay(date)).toBe("12/31/2030");
  });

  it("should return EMPTY_VALUE for null", () => {
    expect(formatToDisplay(null)).toBe(DATE_FORMATS.EMPTY_VALUE);
  });

  it("should return EMPTY_VALUE for an invalid date", () => {
    expect(formatToDisplay(new Date("invalid"))).toBe(DATE_FORMATS.EMPTY_VALUE);
  });
});

describe("formatToInput", () => {
  it("should format a Date object to yyyy-MM-dd", () => {
    const date = new Date(2030, 11, 31);
    expect(formatToInput(date)).toBe("2030-12-31");
  });

  it("should return EMPTY_VALUE for null", () => {
    expect(formatToInput(null)).toBe(DATE_FORMATS.EMPTY_VALUE);
  });

  it("should return EMPTY_VALUE for an invalid date", () => {
    expect(formatToInput(new Date("invalid"))).toBe(DATE_FORMATS.EMPTY_VALUE);
  });
});

describe("getTodayDate", () => {
  it("should return a Date object", () => {
    expect(getTodayDate()).toBeInstanceOf(Date);
  });

  it("should return today's date with time set to 00:00:00", () => {
    const today = getTodayDate();
    expect(today.getHours()).toBe(0);
    expect(today.getMinutes()).toBe(0);
    expect(today.getSeconds()).toBe(0);
  });

  it("should match the current date", () => {
    const today = getTodayDate();
    const now = new Date();
    expect(today.getFullYear()).toBe(now.getFullYear());
    expect(today.getMonth()).toBe(now.getMonth());
    expect(today.getDate()).toBe(now.getDate());
  });
});

describe("getTodayDisplay", () => {
  it("should return today in MM/dd/yyyy format", () => {
    const result = getTodayDisplay();
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });
});

describe("getTodayInput", () => {
  it("should return today in yyyy-MM-dd format", () => {
    const result = getTodayInput();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("convertToDisplay", () => {
  it("should convert an input format date to display format", () => {
    expect(convertToDisplay("2030-12-31")).toBe("12/31/2030");
  });

  it("should return the same string if already in display format", () => {
    expect(convertToDisplay("12/31/2030")).toBe("12/31/2030");
  });

  it("should return EMPTY_VALUE for an empty string", () => {
    expect(convertToDisplay("")).toBe(DATE_FORMATS.EMPTY_VALUE);
  });

  it("should return EMPTY_VALUE for an invalid date", () => {
    expect(convertToDisplay("not-a-date")).toBe(DATE_FORMATS.EMPTY_VALUE);
  });
});

describe("convertToInput", () => {
  it("should convert a display format date to input format", () => {
    expect(convertToInput("12/31/2030")).toBe("2030-12-31");
  });

  it("should return the same string if already in input format", () => {
    expect(convertToInput("2030-12-31")).toBe("2030-12-31");
  });

  it("should return EMPTY_VALUE for an empty string", () => {
    expect(convertToInput("")).toBe(DATE_FORMATS.EMPTY_VALUE);
  });

  it("should return EMPTY_VALUE for EMPTY_DISPLAY constant", () => {
    expect(convertToInput(DATE_FORMATS.EMPTY_DISPLAY)).toBe(DATE_FORMATS.EMPTY_VALUE);
  });

  it("should return EMPTY_VALUE for an invalid date", () => {
    expect(convertToInput("not-a-date")).toBe(DATE_FORMATS.EMPTY_VALUE);
  });
});
