export const browserClient = async (url: string, options: RequestInit = {}) => {

    const response = await fetch(`/api/frontend${url}`, options);
    return response;
}