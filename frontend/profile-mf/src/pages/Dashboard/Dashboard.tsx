import DashboardLayout from "../../layouts/DashboardLayout";
import Stories from "../../components/Stories/Stories";
import Feed from "../../components/Feeds/Feed";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

interface DashboardProps {
    onLogout?: () => void;
}

export default function Dashboard({
    onLogout,
}: DashboardProps) {
    return (
        <Provider store={store}>
            <DashboardLayout onLogout={onLogout}>
                <div className="space-y-6">
                    <Stories />

                    <Feed />

                </div>
            </DashboardLayout>
        </Provider>
    );
}
