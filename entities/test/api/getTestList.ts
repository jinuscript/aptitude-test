import { serverClient } from "@/shared/api/serverClient";

export const getTestList = async () => {
    return await serverClient('/test');
};
