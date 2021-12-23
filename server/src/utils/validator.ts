export const isValidLatitude = (latitude: number) => {
  let result = false;

  if (latitude >= -90 && latitude <= 90) {
    result = true;
  }

  return result;
};

export const isValidLongitude = (longitude: number) => {
  let result = false;

  if (longitude > -180 && longitude <= 180) {
    result = true;
  }

  return result;
};
