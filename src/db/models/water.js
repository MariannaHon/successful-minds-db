import mongoose from 'mongoose';

const waterNotesSchema = new mongoose.Schema(
  {
    waterVolume: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
},
{
    timestamps: true,
    versionKey: false,
  },
);

const waterRateSchema = new mongoose.Schema(
    {
        waterRate: {
            type: Number,
            required: true,
        default: 2000 },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
    },
    {
        timestamps: true,
        versionKey: false,
      },
);
const waterNotesCollection = mongoose.model('Water', waterNotesSchema);
const waterRate = mongoose.model('WaterRate', waterRateSchema);

export { waterNotesCollection, waterRate };
