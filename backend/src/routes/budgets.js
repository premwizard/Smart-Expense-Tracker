import express from 'express';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth.js';
import validateRequest from '../middlewares/validateRequest.js';
import { supabase } from '../services/supabaseClient.js';
const router = express.Router();
router.use(authMiddleware);
router.get('/', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { data, error } = await supabase.from('budgets').select('*').eq('user_id', userId).order('start_date', { ascending: false });
        if (error)
            return res.status(400).json({ error: error.message });
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
router.post('/', [
    body('name').notEmpty(),
    body('amount').isFloat({ min: 0 }),
    body('start_date').isISO8601(),
    body('end_date').isISO8601(),
], validateRequest, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { name, amount, start_date, end_date, category } = req.body;
        const { data, error } = await supabase.from('budgets').insert([{ user_id: userId, name, amount, start_date, end_date, category }]);
        if (error)
            return res.status(400).json({ error: error.message });
        res.status(201).json(data[0]);
    }
    catch (err) {
        next(err);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const updates = req.body;
        const { data, error } = await supabase.from('budgets').update(updates).eq('id', id).eq('user_id', userId).single();
        if (error)
            return res.status(400).json({ error: error.message });
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { error } = await supabase.from('budgets').delete().eq('id', id).eq('user_id', userId);
        if (error)
            return res.status(400).json({ error: error.message });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
export default router;
