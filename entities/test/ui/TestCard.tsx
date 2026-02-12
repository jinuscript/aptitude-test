import { type ReactNode } from "react";
import { Test } from "../type/TestType";

const TestCard = ({ test, children }: { test: Test; children: ReactNode }) => {
    const { name, currentSection, sectionList, purchaseDate, status } = test;

    return (
        <div>
            <h1>{name}</h1>
            <p>현재 단계: {currentSection}</p>
            <p>총 파트: {sectionList.length}</p>
            <p>구매 날짜: {purchaseDate}</p>
            <p>현재 상태: {status}</p>
            {children}
        </div>
    );
};

export default TestCard;