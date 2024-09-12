import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { userId, totalCost } = req.body;

        if (!userId || !totalCost) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Fetch the user's current balance
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Calculate the new balance after withdrawal
        const newBalance = user.balance - totalCost;

        if (newBalance < 0) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Update the user's balance
        await prisma.user.update({
            where: { id: userId },
            data: { balance: newBalance }
        });

        // Create the withdrawal transaction
        const transaction = await prisma.transaction.create({
            data: {
                userId: userId,
                type: 'WITHDRAWAL',
              
                totalCost: totalCost
            }
        });

        // Return the created transaction
        res.status(201).json(transaction);
    } catch (error: any) {
        console.error('Transaction creation failed:', error);
        res.status(500).json({ message: 'Failed to create transaction', error: error.message });
    }
}
