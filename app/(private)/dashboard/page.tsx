import TestList from "@/widget/TestList/ui/TestList";
import TestSummary from "@/widget/TestSummary/ui/TestSummary";

export default async function DashboardPage() {
    return (
        <main className="flex flex-col gap-8 min-h-screen">
            {/* 페이지 제목 */}
            <header>
                <h1 className="text-2xl font-bold">대시보드</h1>
            </header>

            <div className="flex flex-col gap-4">
                {/* 검사 요약 카드 */}
                <TestSummary />

                {/* 검사 리스트 */}
                <TestList />
            </div>
        </main>
    );
}