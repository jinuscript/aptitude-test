import { type ReactNode } from "react";

import { Test } from "../type/TestType";

import TestInfo from "./TestInfo";
import TestStatusBadge from "./TestStatusBadge";

const TestCard = ({ test, children }: { test: Test; children: ReactNode }) => {
    const { name, status } = test;

    return (
        <div className="py-2 px-3 border border-gray-200 rounded-lg flex flex-col gap-4">
            {/* 제목 */}
            <div className="flex justify-between items-center">
                <h2>{name}</h2>
                <TestStatusBadge status={status} />
            </div>

            <div className="h-0.5 bg-gray-200 rounded-full" />

            {/* 검사 정보 */}
            <div className="flex items-center justify-between">
                <TestInfo label="구매 날짜" value={test.purchaseDate.split("T")[0]} />
                <TestInfo label="총 파트" value={test.sectionList.length} />
            </div>

            {/* 검사 버튼 */}
            {children}
        </div>
    );
};

export default TestCard;