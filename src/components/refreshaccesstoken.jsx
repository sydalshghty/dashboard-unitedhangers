export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        console.error("No refresh token found.");
        return null;
    }

    try {
        const response = await fetch("https://united-hanger-2025.up.railway.app/api/refresh_token", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${refreshToken}`,
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("accessToken", data.access_token);
            return data.access_token;
        } else {
            console.error("Failed to refresh access token.");
            return null;
        }
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return null;
    }
};





































