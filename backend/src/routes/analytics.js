import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { supabase } from '../services/supabaseClient.js';
const router = express.Router();
router.use(authMiddleware);
router.get('/summary', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const expenseResult = await supabase.from('expenses').select('amount').eq('user_id', userId);
        const incomeResult = await supabase.from('income').select('amount').eq('user_id', userId);
        if (expenseResult.error || incomeResult.error) {
            return res.status(400).json({ error: expenseResult.error?.message || incomeResult.error?.message });
        }
        const totalExpense = expenseResult.data?.reduce((acc, row) => acc + Number(row.amount), 0) ?? 0;
        const totalIncome = incomeResult.data?.reduce((acc, row) => acc + Number(row.amount), 0) ?? 0;
        res.json({ totalExpense, totalIncome, savings: totalIncome - totalExpense });
    }
    catch (err) {
        next(err);
    }
});
export default router;
