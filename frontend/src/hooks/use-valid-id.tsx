import { useParams } from "react-router-dom";
import { useMemo } from "react";

const useValidId = () => {
    const { id } = useParams();

    return useMemo(() => {
        const parsedId = Number(id);
        return isNaN(parsedId) ? null : parsedId;
    }, [id]);
};

export default useValidId;