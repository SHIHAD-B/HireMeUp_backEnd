

import Users from '../database/mongoDb/model/userSchema';

export const expireSubscriptions = async () => {
    try {
        const currentDate = new Date();

        const expiredUsers = await Users.updateMany(
            { 'subscription.end_date': { $lt: currentDate } },
            {
                $push: {
                    expiredSubscriptions: {
                        subscriptionId: '$subscription.subscriptionId',
                        planId: '$subscription.planId',
                        name: '$subscription.name',
                        start_date: '$subscription.start_date',
                        end_date: '$subscription.end_date',
                        createdAt: '$subscription.createdAt'
                    }
                },
                $unset: { subscription: 1 }
            }
        );

        console.log(`Expired subscriptions for ${expiredUsers.modifiedCount} users.`);

    } catch (error) {
        console.error('Error expiring subscriptions:', error);
        throw error;
    }
};
