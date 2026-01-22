import { serverClient } from "@/shared/api/serverClient";

export const getUserTest = async () => {
    return await serverClient('/test');
};
