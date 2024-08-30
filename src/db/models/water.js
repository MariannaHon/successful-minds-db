import mongoose from 'mongoose';

const waterSchema = new mongoose.Schema(
  {
    amount: {
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


export const WaterCollection = mongoose.model('waters', waterSchema);
