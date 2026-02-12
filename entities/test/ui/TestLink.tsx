import Link from "next/link";

import { Test } from "../type/TestType";
import { STATUS_TEXT, STATUS_COLOR } from "../constant/TestConstant";

import { getTestPath } from "../util/getTestPath";

const TestLink = ({ test }: { test: Test }) => {
    return (
        <Link
            href={getTestPath(test)}
            className={`inline-block py-3 px-4 ${STATUS_COLOR[test.status]} w-full rounded-lg text-center font-semibold`}
        >
            {STATUS_TEXT[test.status]}
        </Link>
    );
};

export default TestLink;