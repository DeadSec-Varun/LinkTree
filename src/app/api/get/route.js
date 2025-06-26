import { connectDB } from '@/lib/mongoose';
import { loginRateLimitter } from '@/lib/rateLimitter';
import { createSession } from '@/lib/session';
import { User } from '@/models/Users';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        await connectDB();
        let { handle, password } = await req.json();
        if (!handle || !password) {
            return new Response(JSON.stringify({ error: 'Handle or password missing' }), { status: 400 });
        }

        const isAllowed = await loginRateLimitter(handle);
        console.log('Login rate limit check for handle:', handle, 'is:', isAllowed);
        if (!isAllowed.allowed) {
            return new Response(JSON.stringify({ error: `Too many login attempts. Retry again ${isAllowed.retry} seconds later.` }), { status: 429 });
        }

        // Normalize handle to lowercase
        handle = handle.toLowerCase();
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