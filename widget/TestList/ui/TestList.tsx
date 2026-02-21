import TestCard from "@/entities/test/ui/TestCard";
import TestLink from "@/entities/test/ui/TestLink";

import { Test } from "@/entities/test/type/TestType";
import { getTestList } from "@/entities/test/api/getTestList";

const TestList = async () => {
    const { data } = await getTestList();

    return (
        <div>
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
