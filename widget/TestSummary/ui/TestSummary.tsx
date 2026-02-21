import TestSummaryCard from "@/entities/test/ui/TestSummaryCard";

import { getTestList } from "@/entities/test/api/getTestList";
import { calculateTestCount } from "@/entities/test/util/calculateTestCount";

const TestSummary = async () => {
    const { data } = await getTestList();
    const { inProgressCount, completedCount, totalCount } = calculateTestCount(data);

    return (
        <div className="grid grid-cols-3 gap-4 mb-4">
            <TestSummaryCard type="IN_PROGRESS" count={inProgressCount} />
            <TestSummaryCard type="COMPLETED" count={completedCount} />
            <TestSummaryCard type="TOTAL" count={totalCount} />
        </div>
    );
};

export default TestSummary;