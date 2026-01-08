import { db } from "@/db";
import { testTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    const body = await req.json();
    const id = Number(body.id);

    try {
        var res;

        db.transaction(async (tx) => {
            const [oldState] = await tx.select()
                .from(testTable)
                .where(eq(testTable.id, id));

            res = await tx.update(testTable)
                .set({
                    col3: sql`NOT ${testTable.col3}`
                })
                .where(eq(testTable.id, id));
        })

        return NextResponse.json({
            message: res
        });
    } catch (err: any) {
        return NextResponse.json({
            message: err.message
        });
    }
}