import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

export default function EditProfile() {
    const [formData, setFormData] =
        useState({
            firstName: "",
            lastName: "",
            bio: "",
            location: "",
            website: "",
        });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold mb-6">
                    Edit Profile
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        name="firstName"
                        placeholder="First Name"
                        className="w-full border p-3 rounded-lg"
                        onChange={handleChange}
                    />

                    <input
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full border p-3 rounded-lg"
                        onChange={handleChange}
                    />

                    <textarea
                        name="bio"
                        placeholder="Bio"
                        className="w-full border p-3 rounded-lg"
                        rows={4}
                        onChange={handleChange}
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        className="w-full border p-3 rounded-lg"
                        onChange={handleChange}
                    />

                    <input
                        name="website"
                        placeholder="Website"
                        className="w-full border p-3 rounded-lg"
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}