import * as chai from 'chai';
import { isValidLatitude, isValidLongitude } from '../../src/utils/validator';

const expect = chai.expect;

describe('Check isValidLatitude() in validator.ts', () => {
  it('should return false if the value is less than -90', () => {
    const result = isValidLatitude(-91);
    expect(result).to.be.equal(false);
  });

  it('should return false if the value is greater than 90', () => {
    const result = isValidLatitude(91);
    expect(result).to.be.equal(false);
  });

  it('should return true if the value is between -90 to 90', () => {
    const result = isValidLatitude(90);
    expect(result).to.be.equal(true);
  });
});

describe('Check isValidLongitude() in validator.ts', () => {
  it('should return false if the value is less than -180', () => {
    const result = isValidLongitude(-181);
    expect(result).to.be.equal(false);
  });

  it('should return false if the value is -180', () => {
    const result = isValidLongitude(-180);
    expect(result).to.be.equal(false);
  });

  it('should return false if the value is more than 180', () => {
    const result = isValidLongitude(181);
    expect(result).to.be.equal(false);
  });

  it('should return true if the value is greater than -180 and less than or equal to 180', () => {
    const result = isValidLongitude(180);
    expect(result).to.be.equal(true);
  });
});
