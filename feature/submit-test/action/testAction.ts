'use server';

import { redirect } from "next/navigation";
import { serverClient } from "@/shared/api/serverClient";

export const testAction = async (formData: FormData) => {
    const rawData = Object.fromEntries(formData.entries());
    const { testId, currentSection, code, ...rest } = rawData;

    console.log(rawData)

    const answers = Object.entries(rest)
        .filter(([key]) => !key.startsWith('$'))
        .map(([id, value]) => ({
            id,
            value: Number(value)
        }));

    // 응답 임시 저장
    await serverClient(`/test/${testId}/section/${currentSection}`, {
        method: "PATCH",
        body: JSON.stringify(answers),
    });

    // 페이지 이동
    const { data } = await serverClient(`/test/${testId}/section/${currentSection}`, {
        method: "POST",
    });

    if (data.nextSection === null) {
        redirect(`/result/${code}/${testId}`);
    }
    redirect(`/test/${code}/${testId}/section/${data.nextSection}`);
}
