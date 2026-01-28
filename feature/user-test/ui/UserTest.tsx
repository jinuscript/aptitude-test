import Link from "next/link";
import { getUserTest } from "../api/getUserTest";
import { createTestRoute } from "../utils/createTestRoute";

const UserTest = async () => {
    const { data } = await getUserTest();

    return (
        <div>
            <h1>UserTest</h1>
            {data.map((test: any) => (
                <div key={test.testId}>
                    <h2>{test.testId}</h2>
                    <p>{test.userId}</p>
                    <p>{test.code}</p>
                    <p>{test.currentSection}</p>
                    <p>{test.totalSection}</p>
                    <p>{test.purchaseDate}</p>
                    <Link href={createTestRoute(test.status, test.code, test.testId, test.currentSection)}>바로 가기</Link>
                </div>
            ))}
        </div>
    );
};

export default UserTest;
