import { getAccessToken, refreshAccessToken } from "./refreshaccesstoken";

export const authFetch = async (url, options = {}) => {
    let token = getAccessToken();

    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
        },
    });
    if (response.status === 401) {
        const newToken = await refreshAccessToken();

        if (newToken) {
            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    "Authorization": `Bearer ${newToken}`,
                },
            });
        } else {
            window.location.href = "/login";
        }
    }

    return response;
};
