import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: 'Unnamed'
    },
    specie: {
      type: String,
      trim: true,
      required: true
    },
    birthDate: {
      type: Date
    },
    adopted: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const PetModel = mongoose.model('Pet', petSchema);

export default PetModel;