import mongoose from "mongoose";

const DataSchema =new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    roll: {
         type: Number ,
         required: true 
        },
    email: {
         type: String ,
         unique: true ,
         required: true 
        },
    phoneNo: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    },

  },

  {
    versionKey: false,

    timestamps: true,
  }
);

const userModel = mongoose.model("user", DataSchema);

export default userModel;
