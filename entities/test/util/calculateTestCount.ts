import { Test } from "../type/TestType";

export const calculateTestCount = (tests: Test[]) => {
    const totalCount = tests.length;
    const inProgressCount = tests.filter((test: Test) => test.status === "IN_PROGRESS" || test.status === "NOT_STARTED").length;
    const completedCount = tests.filter((test: Test) => test.status === "COMPLETED").length;

    return { inProgressCount, completedCount, totalCount };
};