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
            success: true
        };
    } catch (error) {
        console.error('Error ordering product:', error);
        return {
            success: false
        }
    }
};