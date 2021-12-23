import { IDbQueryResult } from '../interfaces/dbQueryResult.interface';

export const addNew = async (params: { model: any; obj: any }) => {
  const result: IDbQueryResult = {
    success: false,
    queryResponse: null,
    message: null,
  };

  await new Promise<void>((resolve) => {
    new params.model(params.obj)
      .save()
      .then((res: any) => {
        delete res._id;
        result.success = true;
        result.queryResponse = res;
        resolve();
      })
      .catch((err: any) => {
        result.message = 'Something went wrong';
        resolve();
      });
  });

  return result;
};

export const findOne = async (params: { model: any; obj: any }) => {
  const result: IDbQueryResult = {
    success: false,
    queryResponse: null,
    message: null,
  };

  await new Promise<void>((resolve) => {
    params.model.findOne(params.obj, (err: any, res: any) => {
      if (err) {
        result.message = 'Could not connect to the database';
      } else {
        result.success = true;
        result.queryResponse = res;
      }

      resolve();
    });
  });

  return result;
};

export const findAll = async (params: { model: any; obj: any }) => {
  const result: IDbQueryResult = {
    success: false,
    queryResponse: null,
    message: null,
  };

  await new Promise<void>((resolve) => {
    params.model.find(params.obj, (err: any, res: any) => {
      if (err) {
        result.message = 'Could not connect to the database';
      } else {
        result.success = true;
        result.queryResponse = res;
      }

      resolve();
    });
  });

  return result;
};
