// src/components/Profile/ProfileInfo.tsx

interface ProfileInfoProps {
    fullName: string;
    bio: string;
    location: string;
    website: string;
}

export default function ProfileInfo({
    fullName,
    bio,
    location,
    website,
}: ProfileInfoProps) {
    return (
        <div className="py-4">
            <h3 className="text-lg font-semibold">
                {fullName}
            </h3>

            <p className="mt-2 text-gray-700">
                {bio}
            </p>

            <p className="mt-2 text-sm text-gray-500">
                📍 {location}
            </p>

            <a
                href={website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
            >
                {website}
            </a>
        </div>
    );
}