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


const waterNotesCollection = mongoose.model('Water', waterNotesSchema);

export { waterNotesCollection };
