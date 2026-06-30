import DashboardLayout from "../../layouts/DashboardLayout";
import Stories from "../../components/Stories/Stories";
import Feed from "../../components/Feeds/Feed";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export default function Dashboard() {
    return (
        <Provider store={store}>
            <DashboardLayout>
                <div className="space-y-6">
                    <Stories />

                    <Feed />

                </div>
            </DashboardLayout>
        </Provider>
    );
}