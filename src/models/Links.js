import mongoose  from 'mongoose';

export const linkSchema = new mongoose.Schema({
  linktext: { type: String, required: true },
  link: { type: String, required: true},
},
{ _id: false, timestamps: false }
);

