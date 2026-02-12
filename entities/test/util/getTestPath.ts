import { Test } from "../type/TestType";

export const getTestPath = (test: Test) => {
    const { status, code, testId, currentSection } = test;

    if (status === "COMPLETED") {
        return `/result/${code}/${testId}`;
    }

    return `/test/${code}/${testId}/section/${currentSection}`;
}