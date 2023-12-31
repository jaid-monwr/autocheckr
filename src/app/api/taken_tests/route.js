import { NextResponse } from "next/server";
const query = require("@/utils/query");

export const GET = async (request) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    try {
        const tests = await query.getTakenTests(email);
        console.log(tests.rows);

        return new NextResponse(JSON.stringify(tests.rows), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};