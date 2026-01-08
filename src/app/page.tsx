"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Row = {
  id: number,
  col1: string,
  col2: number,
  col3: boolean,
  createdAt: string
};

function MethodDoc({ method, guide, classes }: {
  method: string,
  guide: string,
  classes: string
}) {
  return (
    <div className="space-x-2">
      <Badge variant="secondary" className={`text-white ${classes}`}>{method}</Badge>
      <span>{guide}</span>
    </div>
  );
}

export default function Home() {
  const [log, setLog] = useState<any>(null);
  const [list, setList] = useState<Row[]>([]);
  const [input, setInput] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [updateBtnVariant, setUpdateBtnVariant] = useState<"secondary" | "default">("secondary")

  useEffect(() => {
    refreshTable();
  }, []);

  const refreshTable = async () => {
    const res = await fetch("/api/test_table");
    const json = await res.json();

    setList(json.data);
  }

  const planUpdate = async (col1: string) => {
    setInput(col1);
    setUpdateBtnVariant("default");
  }

  const handleSelect = async () => {
    const res = await fetch(`/api/test_table/crud?col1=${input}`, {
      method: "GET"
    });
    setInput("");

    const json = await res.json();
    setLog(JSON.stringify(json));

    await refreshTable();
  }

  const handleInsert = async () => {
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
  }

  const handleUpdate = async () => {
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
  }

  const handleToggle = async (id: number) => {
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
  }

  const handleDelete = async (id?: number) => {
    const res = await fetch(`/api/test_table/crud?id=${id}&col1=${input}`, {
      method: "DELETE"
    });
    setInput("");

    const json = await res.json();
    setLog(JSON.stringify(json));

    await refreshTable();
  }

  return (
    <div className="m-auto p-4 w-full md:w-1/3 space-y-8">
      <div className="space-y-4">
        <p>{log
          && <Alert>
            <AlertTitle>Log</AlertTitle>
            <AlertDescription>{log}</AlertDescription>
          </Alert>}</p>
        <div className="flex space-x-2">
          <Input placeholder="param1" className="w-1/3" value={input} onChange={(e) => {
            setInput(e.target.value);
            if (updateBtnVariant === "default")
              setUpdateBtnVariant("secondary");
          }} />
          <Input placeholder="param2" className="w-full" value={input2} onChange={(e) => {
            setInput2(e.target.value);
          }} />
        </div>
        <div className="space-x-2">
          <Button variant="secondary" onClick={() => handleSelect()}>Select</Button>
          <Button variant="secondary" onClick={() => handleInsert()}>Insert</Button>
          <Button variant={updateBtnVariant} onClick={() => handleUpdate()}>Update</Button>
          <Button variant="secondary" onClick={() => handleDelete()}>Delete</Button>
        </div>
      </div>
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Col 1</TableHead>
              <TableHead>Col 2</TableHead>
              <TableHead>Col 3</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((row: Row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.col1}</TableCell>
                  <TableCell>{row.col2}</TableCell>
                  <TableCell>{row.col3
                    ? <Badge variant="secondary" className="text-white bg-green-500">YES</Badge>
                    : <Badge variant="secondary" className="text-white bg-red-500">NO</Badge>}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell className="space-x-2">
                    <Button onClick={() => {
                      handleToggle(row.id);
                    }} size="icon" variant="secondary" className={`bg-${row.col3 ? `green` : `red`}-600`}>

                      {!row.col3 && <ToggleLeft color="white" />}
                      {row.col3 && <ToggleRight color="white" />}
                    </Button>
                    <Button onClick={() => {
                      planUpdate(row.col1);
                    }} size="icon" variant="secondary" className="bg-blue-600">
                      <Pencil color="white" />
                    </Button>
                    <Button onClick={() => {
                      handleDelete(row.id);
                    }} size="icon" variant="destructive">
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-4">
        <MethodDoc method="SELECT" guide="Where col1 = param1" classes="bg-blue-600" />
        <MethodDoc method="INSERT" guide="Values col1 = param1, col2 = param2" classes="bg-green-600" />
        <MethodDoc method="UPDATE" guide="Set col2 = param2 where col1 = param1" classes="bg-gray-600" />
        <MethodDoc method="DELETE" guide="Where col1 = param1" classes="bg-red-600" />
      </div>
    </div>
  );
}
