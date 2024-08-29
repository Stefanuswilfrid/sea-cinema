import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        console.log("topup")
        const { userId, totalCost } = req.body;
        console.log("test",userId,totalCost)


        if (!userId || !totalCost) {
            return res.status(400).json({ message: 'Invalid input data' });
        }
        console.log("as",userId,totalCost)

        const transaction = await prisma.transaction.create({
            data: {
                userId: userId,
                type: 'TOP_UP',
                totalCost: totalCost
            }
        });

        // Return the created transaction
        res.status(201).json(transaction);
    } catch (error : any) {
        console.error('Transaction creation failed:', error);
        res.status(500).json({ message: 'Failed to create transaction', error: error.message });
    }
}
