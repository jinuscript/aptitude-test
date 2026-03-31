import { NextResponse } from "next/server";
import { readJsonDb } from "@/app/api/database/shared/utils/readJsonDb";
import { ERROR_MESSAGES } from "../shared/constants/errorMessages";

export async function GET(request: Request) {
    try {
        const product = await readJsonDb("app/api/database/data/product.json");
        return NextResponse.json({
            success: true, data: product, error: null
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            data: null,
            error: {
                code: ERROR_MESSAGES.SERVER_ERROR.code,
                message: ERROR_MESSAGES.SERVER_ERROR.message,
                details: []
            }
        }, { status: 500 });
    }
}