import { db } from "@/db";
import { testTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await db.select()
        .from(testTable)
        .orderBy(testTable.id)
        .execute();

    return NextResponse.json({
        data: res
    })
}