const { Volunteer, Student, Session, Academics, Auth, lcl, lch } = require('../db/schema');
function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomEmail() {
    return `${getRandomString(5)}@${getRandomString(5)}.com`;
}

function getRandomPhoneNumber() {
    return `+1-${getRandomNumber(100, 999)}-${getRandomNumber(100, 999)}-${getRandomNumber(1000, 9999)}`;
}

function getRandomRole() {
    const roles = ['mentor', 'lcl', 'cl', 'fellow'];
    return roles[Math.floor(Math.random() * roles.length)];
}

function getRandomGrade() {
    const grades = ['A', 'B', 'C', 'D', 'F'];
    return grades[Math.floor(Math.random() * grades.length)];
}

function getRandomGPA() {
    return (Math.random() * 4).toFixed(2);
}

function getRandomExpertise() {
    const expertise = ['JavaScript', 'Python', 'Machine Learning', 'Data Science', 'React', 'Node.js'];
    return [expertise[Math.floor(Math.random() * expertise.length)], expertise[Math.floor(Math.random() * expertise.length)]];
}

async function generateRandomData() {
    const count = 10;
    try {
        for (let i = 0; i < count; i++) {
            // const randomVolunteer = new Volunteer({
            //     name: getRandomString(10),
            //     mob: getRandomPhoneNumber(),
            //     email: getRandomEmail(),
            //     password: getRandomString(10),
            //     role: getRandomRole(),
            //     expertise: getRandomExpertise(),
            //     historySessions: [],
            //     upcomingSessions: []
            // });

            // const savedVolunteer = await randomVolunteer.save();

            const randomStudent = new Student({
                name: getRandomString(10),
                email: getRandomEmail(),
                mob: getRandomPhoneNumber(),
                // assignedVolunteer: savedVolunteer._id
                assignedVolunteer: '66a59149cd3c38442b82dd7b'
            });

            const savedStudent = await randomStudent.save();

            const randomSession = new Session({
                topic: getRandomString(15),
                date: getRandomDate(new Date(2020, 0, 1), new Date()),
                // volunteer: savedVolunteer._id,
                volunteer: '66a59149cd3c38442b82dd7b',
                students: [savedStudent._id]
            });

            const savedSession = await randomSession.save();

            // const randomAcademics = new Academics({
            //     student: savedStudent._id,
            //     subjects: [
            //         { name: getRandomString(10), grade: getRandomGrade() }
            //     ],
            //     GPA: getRandomGPA(),
            //     awards: [
            //         { title: getRandomString(10), date: getRandomDate(new Date(2015, 0, 1), new Date()) }
            //     ]
            // });

            // await randomAcademics.save();

            // const randomAuth = new Auth({
            //     email: getRandomEmail(),
            //     password: getRandomString(10),
            //     role: getRandomRole()
            // });

            // await randomAuth.save();

            // const randomLCL = new lcl({
            //     name: getRandomString(10),
            //     email: getRandomEmail(),
            //     phone: getRandomPhoneNumber(),
            //     volunteers: [savedVolunteer._id],
            //     center: getRandomString(10)
            // });

            // await randomLCL.save();

            // const randomLCH = new lch({
            //     name: getRandomString(10),
            //     email: getRandomEmail(),
            //     phone: getRandomPhoneNumber(),
            //     lcls: [randomLCL._id],
            //     center: getRandomString(10)
            // });

            // await randomLCH.save();
        }

        console.log(`Successfully added ${count} records to each schema.`);
    } catch (error) {
        console.error('Error generating random data:', error);
    }
}

module.exports = { generateRandomData };