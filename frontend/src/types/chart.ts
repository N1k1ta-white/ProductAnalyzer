export interface ChartDataReduxStore {
    name: string;
    type: "line" | "bar" | "pie" | string; // Можно расширить
    data: any;  // Данные (например, массив точек)
    options?: any; // Конфигурация (оси, цвета и т. д.)
}