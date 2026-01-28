'use server';

import { redirect } from "next/navigation";
import { serverClient } from "@/shared/api/serverClient";

export const testAction = async (formData: FormData) => {
    const rawData = Object.fromEntries(formData.entries());
    const { testId, currentSection, code, ...rest } = rawData;

    const answers = Object.entries(rest)
        .filter(([key]) => !key.startsWith('$'))
        .map(([questionId, value]) => ({
            questionId,
            answer: Number(value)
        }));

    const { data } = await serverClient(`/test/${testId}/section/${currentSection}`, {
        method: "POST",
        body: JSON.stringify(answers),
    });

    if (data.nextSection === null) {
        redirect(`/result/${code}/${testId}`);
    }
    redirect(`/test/${code}/${testId}/section/${data.nextSection}`);
}
