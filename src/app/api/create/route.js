import { connectDB } from '@/lib/mongoose';
import { User } from '@/models/Users';
import bcrypt from 'bcrypt';
import { createSession } from '@/lib/session';

export async function POST(req) {
    try {
        await connectDB();

        let { handle, password } = await req.json();

        if (!handle || !password) {
            return new Response(JSON.stringify({ error: 'Handle and password are required' }), { status: 400 });
        }

        // Normalize handle to lowercase
        handle = handle.toLowerCase();

        const existingUser = await User.findOne({ handle });
        if (existingUser) {
            return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
        }
        // Hash the password before saving
        password = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ handle, password, pic: "", desc: "", links: [] });
        await newUser.save();
        await createSession({ id: newUser._id.toString() });
        return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    let handle = searchParams.get('handle');
    if (!handle) {
        return new Response(JSON.stringify({ error: 'Handle is required' }), { status: 400 });
    }
    await connectDB();
    handle = handle.toLowerCase();
    // Check if the user exists
    const user = await User.findOne({ handle });
    if (user) {
        return new Response(JSON.stringify({ exists: true, message: 'Handle unavailable' }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ exists: false, message: 'Handle available' }), { status: 200 });
    }
}