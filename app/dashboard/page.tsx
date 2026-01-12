import { apiClient } from "@/shared/api/apiClient";

export default async function DashboardPage() {
    const response = await apiClient('/purchase');
    const data = await response.json();
    console.log(data);

    return (
        <main>
            <h1>DashboardPage</h1>
        </main>
    );
}