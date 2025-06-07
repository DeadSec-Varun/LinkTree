import { User } from "@/models/Users";
import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/mongoose";
import LinkText from "@/components/LinkText";

const page = async (param) => {
    const { handle } = await param.params;
    await connectDB();
    const user = await User.findOne({ handle: handle.toLowerCase() }).lean();
    if (!user) {
        notFound();
    }

    return <div className="flex relative min-h-screen justify-center items-start py-10 overflow-hidden">
        {user.pic && (
            <img
                src={user.pic}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-lg opacity-30 scale-110 pointer-events-none select-none"
                style={{ zIndex: 0 }}
            />
        )}
        <div className="photo flex justify-center flex-col items-center gap-4 relative z-10">
            <img src={user.pic} alt="" className="w-32 h-32 object-cover rounded-full shadow-md" />
            <span className="font-bold text-xl">@{user.handle}</span>
            <span className="desc w-80 text-center">{user.desc}</span>
            <div className="links">
                {user.links.map((item, index) => {
                    return <Link key={index} href={item.link}>
                        <LinkText text={item.linktext} />
                    </Link>
                })}
            </div>
        </div>
        <div className="fab fixed bottom-15 self-center z-50">
            <Link href="/home">
                <button
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full p-4 shadow-lg transition-all duration-200 cursor-pointer active:scale-90"
                    aria-label="Go to Home">
                    LinkTr'ee/home
                </button>
            </Link>
        </div>
    </div>
}
export default page;