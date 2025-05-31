import { useEffect } from "react";
import { refreshAccessToken } from "./refreshaccesstoken";  // استدعاء دالة التحديث

const useTokenRefresher = () => {
    useEffect(() => {
        const interval = setInterval(async () => {
            await refreshAccessToken();
        }, 9 * 60 * 1000);  // تحديث كل 9 دقائق

        return () => clearInterval(interval);  // تنظيف الـ `interval` عند إغلاق التطبيق
    }, []);
};

export default useTokenRefresher;

