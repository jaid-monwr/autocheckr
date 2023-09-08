import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Test from "@/models/Test";

export const GET = async (request) => {
  //   const url = new URL(request.url);

  //   const username = url.searchParams.get("username");

  try {
    await connect();

    // const tests = await Post.find(username && { username });
    const tests = await Test.find();

    return new NextResponse(JSON.stringify(tests), { status: 200 });
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
