import express from 'express';
import cors from 'cors';
import supabase from './info-supabase.js';
import sql from './db.js';

const app = express();
const PORT = 8080;
const DB_NAME = "volunteers";

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.listen(PORT, () => {
    console.log('server listening on PORT ', PORT)
});

// Get all possible locations
app.get('/locations', async (req, res) => {
    const locs = await sql `
        SELECT DISTINCT
        location
        FROM volunteers
        WHERE
            location is not null
        ORDER BY
            location
    `;
    res.json(locs);
});

// Get volunteer and all user data based on name (first and last)
app.post('/volunteers', async (req, res) => {
    const data = req.body;
    // console.log(req.body);
    const volunteer = await sql `
        SELECT
            volunteer_id,
            (first_name || ' ' || last_name) as name,
            location,
            start_time_txt as start_time,
            end_time_txt as end_time,
            lanyard_id
        FROM volunteers
        WHERE
            first_name = ${data.firstName} and
            last_name = ${data.lastName} and
            returned is null
        ORDER BY
            start_time_txt
    `;
    res.json(volunteer);
});

// Get volunteer based on volunteer_id
app.get('/volunteers/:id', async (req, res) => {
    const { id } = req.params;
    const volunteer = await sql `
        SELECT
            volunteer_id,
            (first_name || ' ' || last_name) as name,
            location,
            start_time_txt as start_time,
            end_time_txt as end_time,
            quantity,
            lanyard_id
        FROM volunteers
        WHERE
            volunteer_id = ${id}
    `;
    res.json(volunteer);
})

// add a new volunteer
/**
 * first_name, last_name, location, lanyard_id[], email, phone_number
 */
app.post('/addvolunteer', async (req, res) => {
    const newVolunteer = req.body
    console.log(newVolunteer);
    const volunteer = await sql `
        INSERT INTO
            volunteers
        ${ sql(newVolunteer) }
        RETURNING *
    `;
    res.json(volunteer);
});

// update lanyard with volunteer id
// obtain volunteer id after choosing which session
// data.lanyardID : 1, 2 or 1
app.post('/addlanyards/:id', async (req, res) => {
    const volunteerID = req.params;
    const data = req.body;
    const lanyards = await sql `
        UPDATE volunteers
        SET
            lanyard_id = '{${data.lanyardID}}',
            returned = ARRAY[${data.returned}]
        WHERE
            volunteer_id = ${volunteerID}
        RETURNING *
    `;
    res.json(lanyards);
});

// finding a volunteerID based on name or lanyardID
app.post('/findvolunteerID', async (req, res) => {
    const volunteer = req.body;
    // volunteer = {
    //      firstName: "",
    //      lastName: "",
    //      lanyardID: [],
    // }
    const volunteerID = sql `
        SELECT *
        FROM
            volunteers
        WHERE ${
            (volunteer.firstName === "" && volunteer.lastName === "")
            ? sql`lanyard_id @> '{${volunteer.lanyardID}}'`
            : sql`first_name = ${volunteer.firstName} AND last_name = ${volunteer.lastName}`
        }
        AND
            returned is null or
            returned @> ARRAY[false]
    `;
    res.json(volunteerID);
});

// update returned column based on volunteer_id
/**
 * data:
 *      volunteer_id, lanyard_id(s)
 */
app.post('/returnlanyard/:id', async (req, res) => {
    const volunteerID = req.params;
    const data = req.body;
    const returned = await sql `
        UPDATE volunteers
        SET
            returned = ARRAY[${data.returned}]
        WHERE
            volunteer_id = ${volunteerID}
        RETURNING *
    `;
    res.json(returned)
})

async function findVolunteerID(volunteer) {
    const volunteerID = sql `
        SELECT
            volunteer_id
        FROM
            volunteers
        WHERE ${
            (volunteer.firstName === "" && volunteer.lastName === "")
            ? sql`lanyard_id @> ${volunteer.lanyardID}`
            : sql`first_name = ${volunteer.firstName} AND last_name = ${volunteer.lastName}`
        }
        AND
            returned = false
    `;
    return volunteerID.volunteer_id;
}

async function getCols() {
    const cols = await sql`
        select *
        from "Volunteers"
        where false
    `
    return cols;
}
