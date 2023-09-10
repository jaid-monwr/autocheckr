import { NextResponse } from "next/server";
const query = require("@/utils/query");

// Returns two JSON objects: one containing information about the test, and
// the other containing submission information by the student
// if there is no submission yet, the second JSON is null
// remember to handle the null condition
export const GET = async(request) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const testID = url.searchParams.get("testID");

    try {
        const testData = await query.getSingleStudentTest(email, testID);
        console.log(testData.rows);

        const submissionData = await query.getSingleTakenTest(email, testID);
        console.log("showing submission data");
        console.log(submissionData.rows);

        const resData = testData.rows.concat(submissionData.rows);
        if(resData.length == 1)
            resData.push(null);

        return new NextResponse(JSON.stringify(resData), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
}

// Expected format:
// { testID, email, handwrittenScript }
// handwrittenScript is a link
export const POST = async (request) => {
    const {testID, email, handwrittenScript} = await request.json();
    try {
        const test = await query.insertSubmission(testID, email, handwrittenScript);
        console.log(test.rows);
        return new NextResponse(JSON.stringify(test.rows), { status: 201 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};