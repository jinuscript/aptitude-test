import Link from "next/link";
import { getUserTest } from "../api/getUserTest";
import { createTestRoute } from "../utils/createTestRoute";
import TestCard from "./TestCard";
import { Test } from "../type/Test";

const UserTest = async () => {
    const { data } = await getUserTest();

    return (
        <div>
            <h1>UserTest</h1>
            {data.map((test: Test) => (
                <div key={test.testId}>
                    <TestCard test={test}>
                        <Link href={createTestRoute(test.status, test.code, test.testId, test.currentSection)}>바로 가기</Link>
                    </TestCard>
                </div>
            ))}
        </div>
    );
};

export default UserTest;
