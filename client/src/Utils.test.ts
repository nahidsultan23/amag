import { convertToTwelveHoursFormat, convertToTwoCharacterString, getAmPm, timestampToString } from "./Utils/service";

test("convertToTwelveHoursFormat() in service.ts", () => {
    let result = convertToTwelveHoursFormat(0);
    expect(result).toBe(12);

    result = convertToTwelveHoursFormat(10);
    expect(result).toBe(10);

    result = convertToTwelveHoursFormat(13);
    expect(result).toBe(1);
});

test("convertToTwoCharacterString() in service.ts", () => {
    let result = convertToTwoCharacterString("1");
    expect(result).toBe("01");

    result = convertToTwoCharacterString("01");
    expect(result).toBe("01");
});

test("getAmPm() in service.ts", () => {
    let result = getAmPm(10);
    expect(result).toBe("AM");

    result = getAmPm(12);
    expect(result).toBe("PM");

    result = getAmPm(15);
    expect(result).toBe("PM");

    result = getAmPm(0);
    expect(result).toBe("AM");
});

test("timestampToString() in service.ts", () => {
    let result = timestampToString("2021-12-25T09:43:35.393Z");
    expect(result).toBe("25/12/2021, 03:43:35 PM");
});
