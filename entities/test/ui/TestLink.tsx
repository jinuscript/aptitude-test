import Link from "next/link";

import { Test } from "../type/TestType";
import { STATUS_TEXT } from "../constant/TestConstant";

import { getTestPath } from "../util/getTestPath";

const TestLink = ({ test }: { test: Test }) => {
    return (
        <Link href={getTestPath(test)}>{STATUS_TEXT[test.status]}</Link>
    );
};

export default TestLink;