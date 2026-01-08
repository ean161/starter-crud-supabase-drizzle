import { db } from "@/db";
import { testTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const col1 = String(searchParams.get("col1"));

    const result = await db.select()
        .from(testTable)
        .where(eq(testTable.col1, col1));

    if (result.length === 0) {
        return NextResponse.json({
            message: `${col1} not found`
        });
    }

    return NextResponse.json(result);
}

export async function POST(req: Request) {
    const body = await req.json();

    try {
        const result = await db.insert(testTable)
            .values({
                col1: body.col1
            }).execute();
        return NextResponse.json({
            message: result
        });
    } catch (err: any) {
        return NextResponse.json({
            message: err.message
        })
    }
}

export async function PATCH(req: Request) {
    const body = await req.json();

    try {
        const res = await db.update(testTable)
            .set({
                col2: body.col2
            })
            .where(eq(testTable.col1, body.col1));

        return NextResponse.json({
            message: res
        });
    } catch (err: any) {
        return NextResponse.json({
            message: err.message
        })
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const col1 = String(searchParams.get("col1"));

    try {
        const res = await db.delete(testTable)
            .where(eq(testTable.col1, col1));

        return NextResponse.json({
            message: res
        });
    } catch (err: any) {
        return NextResponse.json({
            message: err.message
        })
    }
}