const { Volunteer, Student, Session, Academics, Auth, lcl, lch } = require('../db/schema');
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function getClassesPerMonthForLCL(lclId) {
    try {
        // Retrieve the LCL with the given ID and populate volunteers
        const lclData = await lcl.findById(lclId).populate('volunteers').exec();

        if (!lclData) {
            throw new Error('LCL not found');
        }

        const volunteers = lclData.volunteers;

        // Get the current date
        const now = new Date();

        // Array to store the total number of classes per month for the last 12 months
        const classesPerMonth = new Array(12).fill(0);

        // Loop through each volunteer and aggregate the number of sessions
        for (const volunteer of volunteers) {
            const sessions = await Session.find({ volunteer: volunteer._id }).exec();

            sessions.forEach(session => {
                const sessionDate = new Date(session.date);
                const monthDiff = (now.getFullYear() - sessionDate.getFullYear()) * 12 + (now.getMonth() - sessionDate.getMonth());

                if (monthDiff < 12 && monthDiff >= 0) {
                    classesPerMonth[11 - monthDiff]++;
                }
            });
        }

        // Format the return data
        const formattedClassesPerMonth = classesPerMonth.map((classes, index) => {
            const monthIndex = (now.getMonth() - 11 + index + 12) % 12;
            return {
                x: monthNames[monthIndex],
                y: classes,
            };
        });

        return formattedClassesPerMonth;
    } catch (error) {
        console.error('Error getting classes per month:', error);
        throw error;
    }
};
const getTopPerformersForLCL = async (lclId) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    try {
        const lclData = await lcl.findById(lclId).populate('volunteers').exec();
        if (!lclData) {
            throw new Error('LCL not found');
        }

        const volunteers = lclData.volunteers;
        const volunteerSessionsCount = [];

        for (const volunteer of volunteers) {
            const sessionCount = await Session.countDocuments({
                volunteer: volunteer._id,
                date: { $gte: oneMonthAgo }
            }).exec();

            volunteerSessionsCount.push({
                volunteer: volunteer.name,
                sessions: sessionCount,
                email:volunteer.email
            });
        }
        volunteerSessionsCount.sort((a, b) => b.sessions - a.sessions);
        return volunteerSessionsCount.slice(0, 3);
    } catch (error) {
        console.error('Error getting top performers:', error);
        throw error;
    }
};
const getVolunteersForLCL = async (lclId) => {
    try {
        const lclData = await lcl.findById(lclId).populate('volunteers').exec();
        if (!lclData) {
            throw new Error('LCL not found');
        }

        const volunteers = lclData.volunteers.map(volunteer => ({
            _id: volunteer._id,
            name: volunteer.name,
            email: volunteer.email,
            phone: volunteer.mob,
            role: volunteer.role,
            expertise: volunteer.expertise,
            dateOfJoining: volunteer.dateOfJoining,
            sessionCount: volunteer.historySessions.length,
            upcomingSessionCount: volunteer.upcomingSessions.length,
            someOtherField: "Additional info" // Replace with actual field if available
        }));

        return volunteers;
    } catch (error) {
        console.error('Error getting volunteers:', error);
        throw error;
    }
};

const registeryy = async (req, res) => {
    const { lclId } = req.body;

    if (!lclId) {
        return res.status(400).send('lclId is required');
    }

        const classesPerMonth = await getClassesPerMonthForLCL(lclId);
        res.json({ classesPerMonth });
  
}

const perf = async (req, res) => {
    const { lclId } = req.body;

    try {
        const topPerformers = await getTopPerformersForLCL(lclId);
        res.json({ topPerformers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
const vol = async (req, res) => {
    const { lclId } = req.body;

    try {
        const volunteers = await getVolunteersForLCL(lclId);
        res.json({ volunteers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
module.exports = {registeryy,perf,vol};