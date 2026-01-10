import { redirect } from "next/navigation";
import { refreshTokens } from "./refreshTokens";


export async function apiFetch(url: string, options: RequestInit = {}) {
    let response = await fetch(url, options);

    if (response.status === 401) {
        // 액세스 토큰 만료시 사일런트 리프레쉬
        const refreshOk = await refreshTokens();

        if (refreshOk) {
            // refresh 성공하면 통신 다시 수행
            response = await fetch(url, options);
        } else {
            // refresh 실패하면 로그인 페이지로 이동
            redirect('/login');
        }
    }

    return response;
}
