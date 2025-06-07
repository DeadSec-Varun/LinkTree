export default function LinkText({ text }) {

    return (
    <div className="bg-purple-100 py-4 shadow-lg px-2 min-w-96 flex justify-around rounded-md my-3">
        <div className=" flex-3/4 font-semibold text-lg">
            {text}
        </div>
        <div className="arrow flex items-center ml-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </div>
    </div>
)}