export const useAuth = () => {
    const token = localStorage.getItem("token"); // Проверка токена
    return { isAuthenticated: !!token };
};