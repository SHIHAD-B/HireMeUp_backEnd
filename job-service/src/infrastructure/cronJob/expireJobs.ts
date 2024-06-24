import Jobs from "../database/mongoDb/model/jobSchema";


export const updateExpiredJobs = async () => {
    try {
        const currentDate = new Date();

        const expiredJobs = await Jobs.updateMany(
            { end_date: { $lt: currentDate }, deleted: false },
            { $set: { deleted: true } }
        );

        console.log(`Updated ${expiredJobs.modifiedCount} expired jobs.`);

    } catch (error) {
        console.error('Error updating expired jobs:', error);
        throw error;
    }
};
