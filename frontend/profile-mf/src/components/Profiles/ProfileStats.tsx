// src/components/Profile/ProfileStats.tsx

interface ProfileStatsProps {
    posts: number;
    followers: number;
    following: number;
}

export default function ProfileStats({
    posts,
    followers,
    following,
}: ProfileStatsProps) {
    return (
        <div className="flex gap-10 py-6 border-b">
            <div>
                <p className="text-xl font-bold">{posts}</p>
                <span className="text-gray-500">
                    Posts
                </span>
            </div>

            <div>
                <p className="text-xl font-bold">
                    {followers}
                </p>
                <span className="text-gray-500">
                    Followers
                </span>
            </div>

            <div>
                <p className="text-xl font-bold">
                    {following}
                </p>
                <span className="text-gray-500">
                    Following
                </span>
            </div>
        </div>
    );
}