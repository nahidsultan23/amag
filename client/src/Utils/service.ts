import { constants } from "../Actions/constants";

const convertToTwelveHoursFormat = (hour: number) => {
    let convertedHour = hour;

    if (convertedHour === 0) {
        convertedHour = 12;
    } else if (convertedHour > 12) {
        convertedHour = hour - 12;
    }

    return convertedHour;
};

const convertToTwoCharacterString = (string: string) => {
    let resultString = string;

    if (string.length < 2) {
        resultString = "0" + string;
    }

    return resultString;
};

export const timestampToString = (time: string) => {
    const utcTime = new Date(time);
    const utcTimestamp = utcTime.getTime();
    const bdTimestamp = utcTimestamp + constants.timezone * 3600 * 1000;
    const bdTime = new Date(bdTimestamp);

    let amPm = "AM";

    const year = bdTime.getUTCFullYear().toString();
    const month = convertToTwoCharacterString((bdTime.getUTCMonth() + 1).toString());
    const date = convertToTwoCharacterString(bdTime.getUTCDate().toString());
    const hour = convertToTwoCharacterString(convertToTwelveHoursFormat(bdTime.getUTCHours()).toString());
    const minute = convertToTwoCharacterString(bdTime.getUTCMinutes().toString());
    const second = convertToTwoCharacterString(bdTime.getUTCSeconds().toString());

    if (bdTime.getUTCHours() >= 12) {
        amPm = "PM";
    }

    return date + "/" + month + "/" + year + ", " + hour + ":" + minute + ":" + second + " " + amPm;
};
