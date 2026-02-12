import {Status} from "../type/TestType";

export const STATUS_TEXT: Record<Status, string> = {
    COMPLETED: "결과 보기",
    IN_PROGRESS: "이어하기",
    NOT_STARTED: "시작하기",
};

export const STATUS_COLOR: Record<Status, string> = {
    COMPLETED: "bg-green-500 text-white",
    IN_PROGRESS: "bg-amber-500 text-white",
    NOT_STARTED: "bg-gray-500 text-white",
};

