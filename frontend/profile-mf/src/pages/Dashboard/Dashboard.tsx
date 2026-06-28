import DashboardLayout from "../../layouts/DashboardLayout";
import Stories from "../../components/Stories/Stories";
import Feed from "../../components/Feeds/Feed";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export default function Dashboard() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <Stories />
                <Provider store={store}>
                    <Feed />
                </Provider>
            </div>
        </DashboardLayout>
    );
}