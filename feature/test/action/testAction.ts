'use server';

import { apiClient } from "@/shared/api/apiClient";

const testAction = async () => {
    const response = await apiClient('/test', {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    console.log("사용자 정보 접근 성공!")
}

export default testAction;