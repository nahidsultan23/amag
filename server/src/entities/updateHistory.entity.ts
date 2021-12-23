import * as mongoose from 'mongoose';

const AuditRecordPartialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    jurisdiction: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    latitude: {
      type: String,
      default: null,
    },
    longitude: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);

export const UpdateHistorySchema = new mongoose.Schema({
  auditRecordId: {
    type: String,
    default: null,
    index: true,
  },
  previousRecord: {
    type: AuditRecordPartialSchema,
    default: null,
  },
  newRecord: {
    type: AuditRecordPartialSchema,
    default: null,
  },
  updatedBy: {
    type: String,
    default: null,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});
