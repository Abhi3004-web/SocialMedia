// src/components/Profile/ProfileHeader.tsx

interface ProfileHeaderProps {
    profileImage: string;
    username: string;
}

export default function ProfileHeader({
    profileImage,
    username,
}: ProfileHeaderProps) {
    return (
        <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-sm">
            <img
                src={profileImage}
                alt={username}
                className="w-28 h-28 rounded-full object-cover border-4 border-pink-500"
            />

            <div>
                <h2 className="text-2xl font-bold">
                    {username}
                </h2>

                <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}