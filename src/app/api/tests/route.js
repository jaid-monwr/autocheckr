import { NextResponse } from "next/server";
const pool = require("@/utils/db");

export const GET = async (request) => {
  //   const url = new URL(request.url);
  //   const username = url.searchParams.get("username");

  try {
    const tests = await pool.query("SELECT * FROM Teacher", []);
    console.log(tests)

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
