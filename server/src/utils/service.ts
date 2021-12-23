export const getSubObject = (obj: any, fields: any[]) => {
  const subObject = {};

  for (const key of fields) {
    if (typeof key === 'object') {
      if (key[1]) {
        subObject[key[0]] = obj[key[1]];
      } else {
        subObject[key[0]] = obj[key[0]];
      }
    } else {
      subObject[key] = obj[key];
    }
  }

  return { ...subObject };
};

export const getSubObjectArray = (obj: any[], fields: any[]) => {
  const subObject = [];

  for (const singleObject of obj) {
    const subObjectInArray = {};

    for (const key of fields) {
      if (typeof key === 'object') {
        if (key[1]) {
          subObjectInArray[key[0]] = singleObject[key[1]];
        } else {
          subObjectInArray[key[0]] = singleObject[key[0]];
        }
      } else {
        subObjectInArray[key] = singleObject[key];
      }
    }

    subObject.push(subObjectInArray);
  }

  return [...subObject];
};

export const isDifferent = (obj1: any, obj2: any) => {
  let result = false;

  for (const key in obj1) {
    if ((obj1[key] && !obj2[key]) || (!obj1[key] && obj2[key])) {
      result = true;
      break;
    } else if (obj1[key] && obj2[key] && obj1[key] !== obj2[key]) {
      result = true;
      break;
    }
  }

  return result;
};
