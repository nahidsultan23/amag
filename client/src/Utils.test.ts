import { timestampToString } from './Utils/service';

test('timestampToString() in service.ts', () => {
    let result = timestampToString('2021-12-25T09:43:35.393Z');

    const splittedResult = result.split(',');
    expect(splittedResult.length).toBe(2);

    const splittedFirstPortion = splittedResult[0].split('/');
    expect(splittedFirstPortion.length).toBe(3);
    expect(splittedFirstPortion[0].length).toBe(2);
    expect(splittedFirstPortion[1].length).toBe(2);
    expect(splittedFirstPortion[2].length).toBe(4);
    expect(splittedFirstPortion[0].length).toBeLessThanOrEqual(31);
    expect(splittedFirstPortion[1].length).toBeLessThanOrEqual(12);
    expect(splittedFirstPortion[2].length).toBeLessThanOrEqual(1000);

    const trimmedSecondPortion = splittedResult[1].trim();

    const splittedSecondPortion = trimmedSecondPortion.split(' ')[0].split(':');
    expect(splittedSecondPortion[0].length).toBe(2);
    expect(splittedSecondPortion[1].length).toBe(2);
    expect(splittedSecondPortion[2].length).toBe(2);
    expect(splittedSecondPortion[0].length).toBeLessThanOrEqual(12);
    expect(splittedSecondPortion[1].length).toBeLessThanOrEqual(59);
    expect(splittedSecondPortion[2].length).toBeLessThanOrEqual(59);
});
