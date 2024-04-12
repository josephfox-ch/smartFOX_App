import cron from 'node-cron';
import { cleanExpiredTokens } from '../utils/jwtHelpers';

cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Starting the cleanup process for expired refresh tokens.');
        await cleanExpiredTokens();
        console.log('Cleanup process completed successfully.');
    } catch (error) {
        console.error('Error during the cleanup of expired tokens:', error);
    }
});

