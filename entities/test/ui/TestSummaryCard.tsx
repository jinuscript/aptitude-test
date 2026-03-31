// 맵핑
const TEST_SUMMARY_CONFIG = {
    IN_PROGRESS: {
        title: "진행 중인 검사",
    },
    COMPLETED: {
        title: "완료된 검사",
    },
    TOTAL: {
        title: "총 검사",
    },
};

const TestSummaryCard = ({ type, count }: { type: "IN_PROGRESS" | "COMPLETED" | "TOTAL", count: number }) => {

    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500">{TEST_SUMMARY_CONFIG[type].title}</p>
            <p className="text-2xl font-bold">{count}</p>
        </div>
    );

};

export default TestSummaryCard;