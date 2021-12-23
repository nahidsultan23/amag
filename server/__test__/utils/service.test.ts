import * as chai from 'chai';
import {
  getSubObject,
  getSubObjectArray,
  isDifferent,
} from '../../src/utils/service';

const expect = chai.expect;

describe('Check getSubObject() in service.ts', () => {
  it('should return the sub object', () => {
    const result = getSubObject(
      {
        a: 1,
        b: 2,
        c: 3,
      },
      ['a', 'c'],
    );

    expect(result).to.be.eql({
      a: 1,
      c: 3,
    });
  });

  it('should return the sub object with the changed name', () => {
    const result = getSubObject(
      {
        a: 1,
        b: 2,
        c: 3,
      },
      ['a', ['d', 'c']],
    );

    expect(result).to.be.eql({
      a: 1,
      d: 3,
    });
  });
});

describe('Check getSubObjectArray() in service.ts', () => {
  it('should return the sub object array', () => {
    const result = getSubObjectArray(
      [
        {
          a: 1,
          b: 2,
          c: 3,
        },
        {
          a: 4,
          b: 5,
          c: 6,
        },
      ],
      ['a', 'c'],
    );

    expect(result).to.be.eql([
      {
        a: 1,
        c: 3,
      },
      {
        a: 4,
        c: 6,
      },
    ]);
  });

  it('should return the sub object array with the changed name', () => {
    const result = getSubObjectArray(
      [
        {
          a: 1,
          b: 2,
          c: 3,
        },
        {
          a: 4,
          b: 5,
          c: 6,
        },
      ],
      ['a', ['d', 'c']],
    );

    expect(result).to.be.eql([
      {
        a: 1,
        d: 3,
      },
      {
        a: 4,
        d: 6,
      },
    ]);
  });
});

describe('Check isDifferent() in validator.ts', () => {
  it('should return false if the two objects are same', () => {
    const result = isDifferent(
      {
        a: 1,
        b: 2,
        c: 3,
      },
      {
        a: 1,
        b: 2,
        c: 3,
      },
    );

    expect(result).to.be.equal(false);
  });

  it('should return true if the two objects are different', () => {
    const result = isDifferent(
      {
        a: 1,
        b: 2,
        c: 3,
      },
      {
        a: 1,
        b: 2,
        d: 3,
      },
    );

    expect(result).to.be.equal(true);
  });

  it('should return true if the first object has null but another has a value', () => {
    const result = isDifferent(
      {
        a: 1,
        b: 2,
        c: null,
      },
      {
        a: 1,
        b: 2,
        c: 3,
      },
    );

    expect(result).to.be.equal(true);
  });

  it('should return true if the first object has a value but another has null', () => {
    const result = isDifferent(
      {
        a: 1,
        b: 2,
        c: 3,
      },
      {
        a: 1,
        b: 2,
        c: null,
      },
    );

    expect(result).to.be.equal(true);
  });

  it('should return true if the first object has more key than the second one', () => {
    const result = isDifferent(
      {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      },
      {
        a: 1,
        b: 2,
        c: 3,
      },
    );

    expect(result).to.be.equal(true);
  });

  it('should return false if the second object has more key than the first one', () => {
    const result = isDifferent(
      {
        a: 1,
        b: 2,
        c: 3,
      },
      {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      },
    );

    expect(result).to.be.equal(false);
  });
});
