import { useEffect } from "react";
import { refreshAccessToken } from "./refreshaccesstoken";

const useTokenRefresher = () => {
    useEffect(() => {
        const interval = setInterval(async () => {
            await refreshAccessToken();
        }, 9 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);
};

export default useTokenRefresher;
