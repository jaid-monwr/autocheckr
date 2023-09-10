const pool = require("@/utils/db");

async function getTeacherTests(email) {
    const sql = `
    SELECT t.classid as classid, c.name as classname, t.testid as testid, t.name as testname, t.starttime as starttime,
        t.duration as duration, t.submissionopen as submissionopen, t.scripttemplate as scripttemplate,
        t.sampleanswer as sampleanswer, t.maxmarks as maxmarks, tc.email as teacheremail    
    FROM Test t
    JOIN Clss c ON t.classid = c.classid
    JOIN Teacher tc ON tc.email = c.teacheremail
    WHERE tc.email = $1;
    `;
    try {
        return await pool.query(sql, [email]);
    } catch(err) {
        console.log(err);
        return {};
    }
}

async function getAllStudentTests(email) {
    const sql = `
    SELECT c.classid as classid, c.name as classname, c.teacheremail as teacheremail, t.testid as testid,
        t.name as testname, t.starttime as starttime, t.duration as duration, t.submissionopen as submissionopen,
        t.scripttemplate as scripttemplate, t.sampleanswer as sampleanswer, t.maxmarks as maxmarks
    FROM Student s
    JOIN Is_in_class i ON s.email = i.studentemail
    JOIN Clss c ON i.classid = c.classid
    JOIN Test t ON t.classid = c.classid
    WHERE s.email = $1;
    `;
    try {
        return await pool.query(sql, [email]);
    } catch(err) {
        console.log(err);
        return {};
    }
}

async function getSingleStudentTest(email, testID) {
    const sql = `
    SELECT c.classid as classid, c.name as classname, c.teacheremail as teacheremail, t.testid as testid,
        t.name as testname, t.starttime as starttime, t.duration as duration, t.submissionopen as submissionopen,
        t.scripttemplate as scripttemplate, t.sampleanswer as sampleanswer, t.maxmarks as maxmarks
    FROM Student s
    JOIN Is_in_class i ON s.email = i.studentemail
    JOIN Clss c ON i.classid = c.classid
    JOIN Test t ON t.classid = c.classid
    WHERE s.email = $1 AND t.testid = $2;
    `;
    try {
        return await pool.query(sql, [email, testID]);
    } catch(err) {
        console.log(err);
        return {};
    }
}

async function getTakenTests(email) {
    const sql = `
    SELECT  c.classid as classid, c.name as classname, c.teacheremail as teacheremail, t.testid as testid,
        t.name as testname, t.starttime as starttime, t.duration as duration, t.submissionopen as submissionopen,
        t.scripttemplate as scripttemplate, t.sampleanswer as sampleanswer, t.maxmarks as maxmarks,
        tk.mark as mark, tk.handwrittenscript as handwrittenscript, tk.ocrscript as ocrscript,
        tk.recheckrequested as recheckrequested, tk.recheckstatus as recheckstatus,
        tk.recheckedmark as recheckedmark, tk.submissiontime as submissiontime, tk.semail as studentemail
    FROM Takes tk
    JOIN Test t ON t.testid = tk.testid
    JOIN Clss c ON c.classid = t.classid
    WHERE tk.semail = $1;
    `;
    try {
        return await pool.query(sql, [email]);
    } catch(err) {
        console.log(err);
        return {};
    }
}

async function getSingleTakenTest(email, testID) {
    const sql = `
    SELECT  c.classid as classid, c.name as classname, c.teacheremail as teacheremail, t.testid as testid,
        t.name as testname, t.starttime as starttime, t.duration as duration, t.submissionopen as submissionopen,
        t.scripttemplate as scripttemplate, t.sampleanswer as sampleanswer, t.maxmarks as maxmarks,
        tk.mark as mark, tk.handwrittenscript as handwrittenscript, tk.ocrscript as ocrscript,
        tk.recheckrequested as recheckrequested, tk.recheckstatus as recheckstatus,
        tk.recheckedmark as recheckedmark, tk.submissiontime as submissiontime, tk.semail as studentemail
    FROM Takes tk
    JOIN Test t ON t.testid = tk.testid
    JOIN Clss c ON c.classid = t.classid
    WHERE tk.semail = $1 AND tk.testid = $2;
    `;
    try {
        return await pool.query(sql, [email, testID]);
    } catch(err) {
        console.log(err);
        return {};
    }
}

async function insertTest(classID, name, duration, scripttemplate, sampleanswer, maxmarks) {
    const sql = `
    INSERT INTO Test(classID, name, duration, scripttemplate, sampleanswer, maxmarks)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    try {
        return await pool.query(sql, [classID, name, duration, scripttemplate, sampleanswer, maxmarks]);
    } catch(err) {
        console.log(err);
        return {};
    }
}

async function insertSubmission(testid, email, handwrittenscript) {
    const sql = `
    INSERT INTO Takes(testid, semail, handwrittenscript)
    VALUES($1, $2, $3) RETURNING *;
    `;
    try {
        return await pool.query(sql, [testid, email, handwrittenscript]);
    } catch(err) {
        console.log(err);
        return {};
    }
}

module.exports = {
    getTeacherTests, 
    getAllStudentTests,
    getSingleStudentTest,
    getTakenTests,
    getSingleTakenTest,
    insertTest,
    insertSubmission
}