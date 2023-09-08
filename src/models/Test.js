import mongoose from "mongoose";

const { Schema } = mongoose;

const testSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: {
        type: String,
        required: true,
      },
    },
    content: {
      type: {
        type: String,
        required: true,
      },
    },
    username: {
      type: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Test || mongoose.model("Test", testSchema);

// export default mongoose.model("Test", testSchema);
