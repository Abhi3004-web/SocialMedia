export default function CreatePost() {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full border rounded-lg p-3"
            />

            <button className="mt-4 bg-pink-600 text-white px-5 py-2 rounded-lg">
                Post
            </button>
        </div>
    );
}