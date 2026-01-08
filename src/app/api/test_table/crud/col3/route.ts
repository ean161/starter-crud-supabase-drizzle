import { db } from "@/db";
import { testTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    const body = await req.json();
    const id = body.id;

    try {
        const res = await db.update(testTable)
            .set({
                col3: sql`NOT ${testTable.col3}`
            })
            .where(eq(testTable.id, id));

        return NextResponse.json({
            message: res
        });
    } catch (err: any) {
        return NextResponse.json({
            message: err.message
        });
    }
}