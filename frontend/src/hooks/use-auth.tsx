export const useAuth = () => {
    const token = localStorage.getItem(process.env.VITE_JWT_KEY_TO_LOCAL_STORAGE??""); // Проверка токена
    return { isAuthenticated: !!token };
};