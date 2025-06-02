import { connectDB } from '@/lib/mongoose';
import { createSession } from '@/lib/session';
import { User } from '@/models/Users';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        await connectDB();

        const { handle, password } = await req.json();

        if (!handle || !password) {
            return new Response(JSON.stringify({ error: 'Handle or password missing' }), { status: 400 });
        }
        const user = await User.findOne({ handle });
        console.log(user);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }
        
        await createSession({ id: user._id.toString() });
        return new Response(JSON.stringify({ message: 'User logged in successfully' }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}