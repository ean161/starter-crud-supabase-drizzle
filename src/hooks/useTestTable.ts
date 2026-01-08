import { buttonVariants } from "@/components/ui/button";
import { Row } from "@/types/Row";
import { useState, useEffect, useCallback } from "react";

export default function useTestTable() {
    const [log, setLog] = useState<any>(null);
    const [list, setList] = useState<Row[]>([]);
    const [input, setInput] = useState<string>("");
    const [input2, setInput2] = useState<string>("");
    const [updateBtnVariant, setUpdateBtnVariant] = useState<"secondary" | "default">("secondary")

    useEffect(() => {
        refreshTable();
    }, []);

    const refreshTable = useCallback(async () => {
        const res = await fetch("/api/test_table");
        const json = await res.json();

        setList(json.data);
    }, []);

    const planUpdate = useCallback((col1: string) => {
        setInput(col1);
        setUpdateBtnVariant("default");
    }, []);

    const handleSelect = useCallback(async () => {
        const res = await fetch(`/api/test_table/crud?col1=${input}`, {
            method: "GET"
        });
        setInput("");

        const json = await res.json();
        setLog(JSON.stringify(json));

        await refreshTable();
    }, [input]);

    const handleInsert = useCallback(async () => {
        const res = await fetch("/api/test_table/crud", {
            method: "POST",
            body: JSON.stringify({
                col1: input,
                col2: input2
            })
        });
        setInput("");
        setInput2("");

        const json = await res.json();
        setLog(JSON.stringify(json));

        await refreshTable();
    }, [input, input2]);

    const handleUpdate = useCallback(async () => {
        setUpdateBtnVariant("secondary");
        const res = await fetch("/api/test_table/crud", {
            method: "PATCH",
            body: JSON.stringify({
                col1: input,
                col2: parseInt(input2)
            })
        });
        setInput("");
        setInput2("");

        const json = await res.json();
        setLog(JSON.stringify(json));

        await refreshTable();
    }, [input, input2]);

    const handleToggle = useCallback(async (id: number) => {
        const res = await fetch("/api/test_table/crud/col3", {
            method: "PATCH",
            body: JSON.stringify({
                id: id
            })
        });
        setInput("");
        setInput2("");

        const json = await res.json();
        setLog(JSON.stringify(json));

        await refreshTable();
    }, []);

    const handleDelete = useCallback(async (id?: number) => {
        const res = await fetch(`/api/test_table/crud?id=${id}&col1=${input}`, {
            method: "DELETE"
        });
        setInput("");

        const json = await res.json();
        setLog(JSON.stringify(json));

        await refreshTable();
    }, [input]);

    return {
        log,
        list,
        input,
        setInput,
        input2,
        setInput2,
        updateBtnVariant,
        setUpdateBtnVariant,
        handleSelect,
        handleInsert,
        planUpdate,
        handleUpdate,
        handleToggle,
        handleDelete
    }
}