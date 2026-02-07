"use server";

import { serverClient } from "@/shared/api/serverClient";

export const orderAction = async (code: string, totalSection: number) => {
    try {
        await serverClient('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                totalSection,
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