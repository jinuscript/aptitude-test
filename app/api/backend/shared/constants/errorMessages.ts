export const ERROR_MESSAGES = {
    INVALID_INPUT: {
        code: "INVALID_INPUT",
        message: "유효하지 않은 입력값입니다.",
        details: []
    },
    INVALID_TOKEN: {
        code: "INVALID_TOKEN",
        message: "유효하지 않은 토큰입니다.",
        details: []
    },
    AUTH_FAILED: {
        code: "AUTH_FAILED",
        message: "아이디 혹은 비밀번호를 확인해주세요.",
        details: []
    },
    SERVER_ERROR: {
        code: "SERVER_ERROR",
        message: "서버에러 발생!",
        details: []
    },
} as const;

