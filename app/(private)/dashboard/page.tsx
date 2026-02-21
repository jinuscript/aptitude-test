import TestList from "@/widget/TestList/ui/TestList";
import TestSummary from "@/widget/TestSummary/ui/TestSummary";

export default async function DashboardPage() {
    return (
        <main>
            {/* 검사 요약 카드 */}
            <TestSummary />

            {/* 검사 리스트 */}
            <TestList />
        </main>
    );
}