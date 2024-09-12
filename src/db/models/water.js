import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    time: {
<<<<<<< water-routs&docs
      type: Date,
      required: true,
=======
        type: Date,
        required: true,
>>>>>>> main
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


export const WaterCollection = model('waters', waterSchema);
