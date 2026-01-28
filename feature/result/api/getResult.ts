import { serverClient } from "@/shared/api/serverClient";

export const getResult = async (id: string) => {
    return await serverClient(`/result/${id}`);
};
