"use server";

import { serverClient } from "@/shared/api/serverClient";
import { type Code } from "@/shared/types/Code";

export const purchaseTestAction = async (code: Code) => {
    try {
        await serverClient('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code
            }),
        });

        return {
            success: true,
            message: '상품 구매에 성공했습니다.'
        };
    } catch (error) {
        return {
            success: false,
            message: '상품 구매에 실패했습니다.'
        }
    }
};