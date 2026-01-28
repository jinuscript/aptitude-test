export const createTestRoute = (status: string, code: string, testId: string, currentSection: string) => {
    if (status === "COMPLETED") {
        return `/result/${code}/${testId}`;
    }

    return `/test/${code}/${testId}/section/${currentSection}`;
}