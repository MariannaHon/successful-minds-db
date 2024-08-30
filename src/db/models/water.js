import mongoose from 'mongoose';

const waterSchema = new mongoose.Schema(
  {
    amount: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
},
{
    timestamps: true,
    versionKey: false,
  },
);


export const WaterCollection = mongoose.model('waters', waterSchema);
