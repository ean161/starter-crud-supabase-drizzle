"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [input, setInput] = useState<string>("");
  const [input2, setInput2] = useState<string>("");

  const handleSelect = async () => {
    const res = await fetch(`/api/test_table/crud?col1=${input}`, {
      method: "GET"
    });
    setInput("");

    const json = await res.json();
    setLog(JSON.stringify(json));
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
  }

  const handleUpdate = async () => {
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
  }

  const handleDelete = async () => {
    const res = await fetch(`/api/test_table/crud?col1=${input}`, {
      method: "DELETE"
    });
    setInput("");

    const json = await res.json();
    setLog(JSON.stringify(json));
  }

  return (
    <div className="w-1/2 p-4 space-y-4">
      <p>Log: {log}</p>
      <div className="flex space-x-2">
        <Input placeholder="param1" className="w-1/3" value={input} onChange={(e) => {
          setInput(e.target.value);
        }} />
        <Input placeholder="param2" className="w-full" value={input2} onChange={(e) => {
          setInput2(e.target.value);
        }} />
      </div>
      <div className="space-x-2">
        <Button onClick={() => handleSelect()}>Select</Button>
        <Button onClick={() => handleInsert()}>Insert</Button>
        <Button onClick={() => handleUpdate()}>Update</Button>
        <Button onClick={() => handleDelete()}>Delete</Button>
      </div>
      <br />
      <div className="space-y-2">
        <MethodDoc method="SELECT" guide="Where col1 = param1" classes="bg-blue-600" />
        <MethodDoc method="INSERT" guide="Values col1 = param1, col2 = param2" classes="bg-green-600" />
        <MethodDoc method="UPDATE" guide="Set col2 = param2 where col1 = param1" classes="bg-gray-600" />
        <MethodDoc method="DELETE" guide="Where col1 = param1" classes="bg-red-600" />
      </div>
    </div>
  );
}
