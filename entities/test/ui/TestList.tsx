import TestCard from "./TestCard";
import TestLink from "./TestLink";

import { Test } from "../type/TestType";
import { getTestList } from "../api/getTestList";

const TestList = async () => {
    const { data } = await getTestList();

    return (
        <div>
            <h1>UserTest</h1>
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
