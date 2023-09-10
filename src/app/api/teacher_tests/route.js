import { NextResponse } from "next/server";
const query = require("@/utils/query");

export const GET = async (request) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    try {
        const tests = await query.getTeacherTests(email);
        console.log(tests.rows);

        return new NextResponse(JSON.stringify(tests.rows), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

// Expected format:
// { classID, name, duration, scripttemplate, sampleanswer, maxmarks }
// duration in mintes, scripttemplate and sampleanswer are links
export const POST = async (request) => {
    const {classID, name, duration, scripttemplate, sampleanswer, maxmarks} = await request.json();
    try {
        const test = await query.insertTest(classID, name, duration, scripttemplate, sampleanswer, maxmarks);
        console.log(test.rows);
        return new NextResponse(JSON.stringify(test.rows), { status: 201 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
