import TestCard from "@/entities/test/ui/TestCard";
import TestLink from "@/entities/test/ui/TestLink";

import { Test } from "@/entities/test/type/TestType";
import { getTestList } from "@/entities/test/api/getTestList";

const TestList = async () => {
    const { data } = await getTestList();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((test: Test) => (
                <div key={test.testId}>
                    <TestCard test={test}>
                        <TestLink test={test} />
                    </TestCard>
                </div>
            ))}
        </div>
    );
};

export default TestList;
