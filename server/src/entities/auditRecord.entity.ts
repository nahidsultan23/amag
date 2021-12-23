import * as mongoose from 'mongoose';

export const AuditRecordSchema = new mongoose.Schema({
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
  createdBy: {
    type: String,
    default: null,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});
