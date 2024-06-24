import Schedule from "../database/mongoDb/model/scheduleSchema";

export const expireInterview = async () => {
    try {
        const currentDate = new Date();

        const expiredSchedules = await Schedule.updateMany(
            { date: { $lt: currentDate }, status: 'upcomming' },
            { $set: { status: 'cancelled', editedAt: currentDate } }
        );

        console.log(`Expired ${expiredSchedules.modifiedCount} interviews.`);

    } catch (error) {
        console.error('Error expiring interviews:', error);
        throw error;
    }
};
