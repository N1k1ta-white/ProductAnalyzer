import {ChartDataReduxStore} from "@/types/chart.ts";

interface State {
    loading: boolean;
    data: ChartDataReduxStore[];
    error: string | null;
}

const initialState: State = {
    loading: false,
    data: [] as ChartDataReduxStore[],
    error: null,
}





