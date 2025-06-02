import mongoose from 'mongoose';
import { linkSchema } from './Links';

const userSchema = new mongoose.Schema({
    handle: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: { type: String, required: false },
    desc: { type: String, required: false },
    links: { type: [linkSchema], required: false },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export { User };