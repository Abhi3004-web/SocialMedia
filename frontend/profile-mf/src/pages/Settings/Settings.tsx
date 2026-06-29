import DashboardLayout from "../../layouts/DashboardLayout";

export default function Settings() {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
                <h1 className="text-2xl font-bold mb-6">
                    Settings
                </h1>

                <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-semibold">
                            Account Settings
                        </h3>
                    </div>

                    <div className="border rounded-lg p-4">
                        <h3 className="font-semibold">
                            Privacy Settings
                        </h3>
                    </div>

                    <div className="border rounded-lg p-4">
                        <h3 className="font-semibold">
                            Notification Settings
                        </h3>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}