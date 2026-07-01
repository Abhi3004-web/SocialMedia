import DashboardLayout from "../../layouts/DashboardLayout";

import ProfileHeader from "../../components/Profiles/ProfileHeader";
import ProfileStats from "../../components/Profiles/ProfileStats";
import ProfileInfo from "../../components/Profiles/ProfileInfo";
import { useEffect } from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "../../redux/hooks";

import { fetchProfile } from "../../redux/slices/profileSlice";
import Loader from "../../components/Common/Loader";
import { fetchPosts } from "../../redux/slices/postSlice";


export default function Profile() {
    const dispatch =
        useAppDispatch();

    const {
        profile,
        loading,
    } = useAppSelector(
        (state) => state.profile
    );
    const { posts } = useAppSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (!profile && !posts) {
        return null;
    }

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
                <ProfileHeader
                    profileImage={
                        profile?.avatar?.url || ""
                    }
                    username={
                        profile?.username || "Guest"
                    }
                />

                <ProfileStats
                    posts={posts?.length || 0}
                    followers={
                        profile?.followers || 0
                    }
                    following={
                        profile?.following || 0
                    }
                />

                <ProfileInfo
                    fullName={`${profile?.firstName || ""} ${profile?.lastName || ""
                        }`}
                    bio={profile?.bio || ""}
                    location={
                        profile?.location || ""
                    }
                    // website={
                    //     profile?.website || ""
                    // }
                />
            </div>
        </DashboardLayout>
    );
}