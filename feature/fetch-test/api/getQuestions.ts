import { serverClient } from "@/shared/api/serverClient";

export const getQuestions = async (id: string, current: string) => {
    return await serverClient(`/test/${id}/section/${current}`);
}
