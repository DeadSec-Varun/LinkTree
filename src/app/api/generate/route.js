// export const dynamic = 'force-static'
// export const revalidate = 600;

import { connectDB } from '@/lib/mongoose';
import { User } from '@/models/Users';
// import { headers, cookies } from 'next/headers';

export async function PUT(req) {
    try {
        await connectDB();
        const id = req.headers.get('user-id');
        let { pic, desc, links } = await req.json();
        if (!id) {
            return new Response(JSON.stringify({ error: 'Invalid user' }), { status: 401 });
        }
        //update id's data
        if (links[0].linktext == "" || links[0].link == "") {
            return new Response(JSON.stringify({ error: 'Need to enter atleast one link' }), { status: 400 });
        }
        // console.log(links);
        await User.findByIdAndUpdate(id, {
            pic: pic,
            desc: desc,
            links: links
        });
        return new Response(JSON.stringify({ message: 'Links added successfully' }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectDB();
        const id = req.headers.get('user-id');
        console.log('ID in GET: ' + id);
        
        if (!id) {
            return new Response(JSON.stringify({ error: 'Invalid user' }), { status: 401 });
        }
        const data = await User.findById(id,'handle pic desc links').lean();
        if (data == null) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }
        // console.log(data);
        return new Response(JSON.stringify({ data }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}