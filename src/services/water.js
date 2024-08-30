import { WaterCollection } from '../db/models/water.js';
import { startOfDay, endOfDay } from 'date-fns';
import { calculateWaterPercentage } from '../utils/calculateWaterPercentage.js';

export const getAllRecords = async (userId) => {

    const records = await WaterCollection.find({ userId });
    return records;
};

export const createRecord = async (payload) => {
    const record = await WaterCollection.create(payload);
    return record;
};

export const patchRecord = async (recordId, userId, payload, options = {}) => {
    const rawResult = await WaterCollection.findOneAndUpdate(
        { _id: recordId, userId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        });

    if (!rawResult || !rawResult.value) return null;

    return {
        record: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteWater = async (recordId, userId) => {
    const record = await WaterCollection.findOneAndDelete({ _id: recordId, userId });
    return record;
};


export const today = async (userId, waterRate) => {

    console.log(userId);

    const start = startOfDay(new Date());
    const end = endOfDay(new Date());

    return calculateWaterPercentage(userId, waterRate, start, end);
};

export const getRecordsForPeriod = async (userId, start, end) => {

    const records = await WaterCollection.find({
        userId,
        time: {
            $gte: start,
            $lte: end,
        }
    });

    return records;
};
