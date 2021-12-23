import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { config } from 'src/config';
import { addNew, findAll, findOne } from 'src/db/dbQueries';
import { AuditRecordSchema } from 'src/entities/auditRecord.entity';
import { UpdateHistorySchema } from 'src/entities/updateHistory.entity';
import { IUpdateData } from 'src/interfaces/updateData.interface';
import {
  getSubObject,
  getSubObjectArray,
  isDifferent,
} from 'src/utils/service';
import { isValidLatitude, isValidLongitude } from 'src/utils/validator';

@Injectable()
export class FormService {
  constructor(
    @InjectModel('AuditRecord')
    private readonly auditRecordModel: Model<typeof AuditRecordSchema>,
    @InjectModel('UpdateHistory')
    private readonly updateHistoryModel: Model<typeof UpdateHistorySchema>,
  ) {}

  async getData() {
    const resData = {
      success: false,
      data: null,
      message: {
        error: null,
      },
    };

    const resAuditRecord = await findOne({
      model: this.auditRecordModel,
      obj: {},
    });

    if (resAuditRecord.success) {
      if (resAuditRecord.queryResponse) {
        const auditRecordId = resAuditRecord.queryResponse._id;

        const auditRecordData = {
          auditRecord: getSubObject(resAuditRecord.queryResponse, [
            ['auditRecordId', '_id'],
            'name',
            'jurisdiction',
            'description',
            'latitude',
            'longitude',
            'createdBy',
            'createdOn',
          ]),
          updateHistory: [],
        };

        const resUpdateHistory = await findAll({
          model: this.updateHistoryModel,
          obj: {
            auditRecordId: auditRecordId,
          },
        });

        if (resUpdateHistory.success) {
          resData.success = true;

          if (
            resUpdateHistory.queryResponse &&
            resUpdateHistory.queryResponse.length
          ) {
            auditRecordData.updateHistory = getSubObjectArray(
              resUpdateHistory.queryResponse,
              ['updatedBy', 'updatedOn'],
            );
          }

          resData.data = { ...auditRecordData };
        } else {
          resData.message.error = resUpdateHistory.message;
        }
      } else {
        resData.success = true;
      }
    } else {
      resData.message.error = resAuditRecord.message;
    }

    return resData;
  }

  async updateData(body: IUpdateData) {
    const resData = {
      success: false,
      data: null,
      message: {
        latitude: null,
        longitude: null,
        formError: null,
        error: null,
      },
    };

    const name = body.name ? body.name : null;
    const jurisdiction = body.jurisdiction ? body.jurisdiction : null;
    const description = body.description ? body.description : null;
    const latitude = Number(body.latitude) ? body.latitude : null;
    const longitude = Number(body.longitude) ? body.longitude : null;

    if ((latitude || longitude) && !(latitude && longitude)) {
      if (latitude) {
        resData.message.longitude = 'Invalid logitude';
      } else {
        resData.message.latitude = 'Invalid latitude';
      }
    } else if (name || jurisdiction || description || (latitude && longitude)) {
      let errorOccurred = false;

      if (latitude && !isValidLatitude(Number(latitude))) {
        resData.message.latitude = 'Invalid latitude';
        errorOccurred = true;
      }

      if (longitude && !isValidLongitude(Number(longitude))) {
        resData.message.longitude = 'Invalid longitude';
        errorOccurred = true;
      }

      if (!errorOccurred) {
        const resAuditRecord = await findOne({
          model: this.auditRecordModel,
          obj: {},
        });

        if (resAuditRecord.success) {
          const userName = config.userName;

          if (resAuditRecord.queryResponse) {
            const auditRecordId = resAuditRecord.queryResponse._id;

            const updateHistoryObject = {
              auditRecordId: auditRecordId,
              previousRecord: {
                ...resAuditRecord.queryResponse._doc,
              },
              newRecord: {},
              updatedBy: userName,
            };

            resAuditRecord.queryResponse.name = name;
            resAuditRecord.queryResponse.jurisdiction = jurisdiction;
            resAuditRecord.queryResponse.description = description;
            resAuditRecord.queryResponse.latitude = latitude;
            resAuditRecord.queryResponse.longitude = longitude;

            updateHistoryObject.newRecord = {
              ...resAuditRecord.queryResponse._doc,
            };

            if (
              isDifferent(
                updateHistoryObject.previousRecord,
                updateHistoryObject.newRecord,
              )
            ) {
              try {
                await resAuditRecord.queryResponse.save();
              } catch (err: any) {
                resData.message.error = 'Something went wrong';
                errorOccurred = true;
              }

              if (!errorOccurred) {
                const resUpdateHistoryNew = await addNew({
                  model: this.updateHistoryModel,
                  obj: updateHistoryObject,
                });

                if (resUpdateHistoryNew.success) {
                  resData.success = true;
                } else {
                  resData.message.error = 'Something went wrong';
                }
              }
            } else {
              resData.message.error = 'No changes were made';
            }
          } else {
            const resAuditRecordNew = await addNew({
              model: this.auditRecordModel,
              obj: {
                name: name,
                jurisdiction: jurisdiction,
                description: description,
                latitude: latitude,
                longitude: longitude,
                createdBy: userName,
              },
            });

            if (resAuditRecordNew.success) {
              resData.success = true;
            } else {
              resData.message.error = resAuditRecordNew.message;
            }
          }
        } else {
          resData.message.error = resAuditRecord.message;
        }
      }
    } else {
      resData.message.formError =
        'At least one data is required to update the form';
    }

    return resData;
  }
}
