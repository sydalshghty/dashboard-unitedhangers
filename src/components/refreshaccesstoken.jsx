const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        console.error("No refresh token found, redirecting to login.");
        window.location.href = "/login"; // توجيه المستخدم إلى صفحة تسجيل الدخول
        return null;
    }

    try {
        const response = await fetch("https://united-hanger-2025.up.railway.app/api/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            console.error("Failed to refresh token. Redirecting to login.");
            window.location.href = "/login"; // توجيه المستخدم عند فشل التحديث
            return null;
        }

        const data = await response.json();
        
        if (!data.access_token) {
            console.error("Invalid token response. Redirecting to login.");
            window.location.href = "/login";
            return null;
        }

        localStorage.setItem("accessToken", data.access_token);
        return data.access_token;

    } catch (error) {
        console.error("Error refreshing token:", error);
        window.location.href = "/login"; // التوجيه عند حدوث أي خطأ
        return null;
    }
};

export  {refreshAccessToken};