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

// export const POST = async (request) => {
//   const body = await request.json();

//   const newPost = new Post(body);

//   try {
//     await connect();

//     await newPost.save();

//     return new NextResponse("Test has been created", { status: 201 });
//   } catch (err) {
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };
