
import { getRecordsForPeriod } from "../services/water.js";

export const calculateWaterPercentage = async (userId, waterRate, start, end) => {

    const records = await getRecordsForPeriod(userId, start, end);

    const waterToNumber = parseFloat(waterRate);

    const total = records.reduce((total, record) => total + parseFloat(record.amount), 0);

    const percentage = (total / waterToNumber) * 100;

    return { percentage: percentage.toFixed(2), records };
};
