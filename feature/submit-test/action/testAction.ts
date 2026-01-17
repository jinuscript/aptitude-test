'use server';

import { serverClient } from "@/shared/api/serverClient";

export const testAction = async (formData: FormData) => {
    const rawData = Object.fromEntries(formData.entries());
    const part = rawData.part

    const response = await serverClient(`/test/${part}`);
    const data = await response.json();

    console.log(rawData);
}
