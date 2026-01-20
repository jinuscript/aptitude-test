'use server';

import { redirect } from "next/navigation";
import { serverClient } from "@/shared/api/serverClient";

export const testAction = async (formData: FormData) => {
    const rawData = Object.fromEntries(formData.entries());
    const part = rawData.part;
    const test_id = rawData.test_id;

    const response = await serverClient(`/test/${part}`, {
        method: "POST",
        body: JSON.stringify(rawData),
    });
    const { nextPart } = await response.json();

    if (nextPart === "finish") {
        redirect(`/result/${test_id}`);
    }

    redirect(`/test/${test_id}/${nextPart}`);
}
