import { NextResponse } from "next/server";
const query = require("@/utils/query");

// Expected format: { email, password }
// Returns { email, role }
// roles are teacher, student, invalid
export const POST = async (request) => {
    const {email, password} = await request.json();
    try {
        const ans1 = await query.searchTeachers(email, password);
        if(ans1.rowCount > 0)
            return new NextResponse(JSON.stringify({"email": email, "role": "teacher"}), { status: 201 });

        const ans2 = await query.searchStudents(email, password);
        if(ans2.rowCount > 0)
            return new NextResponse(JSON.stringify({"email": email, "role": "student"}), { status: 201 });

        return new NextResponse(JSON.stringify({"email": "", "role": "invalid"}), { status: 500 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};