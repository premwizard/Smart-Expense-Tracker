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
        const { data, error } = await supabase.from('reports').select('*').eq('user_id', userId).order('generated_at', { ascending: false });
        if (error)
            return res.status(400).json({ error: error.message });
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
router.post('/export', [body('type').isIn(['monthly', 'yearly']).withMessage('Report type must be monthly or yearly.')], validateRequest, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { type } = req.body;
        const period = type === 'monthly' ? new Date().toLocaleString('default', { month: 'long', year: 'numeric' }) : new Date().getFullYear().toString();
        const { data, error } = await supabase.from('reports').insert([{ user_id: userId, report_type: `${type.charAt(0).toUpperCase() + type.slice(1)} Report`, period, metadata: { preparedAt: new Date().toISOString() }, download_url: null }]);
        if (error)
            return res.status(400).json({ error: error.message });
        res.status(201).json(data[0]);
    }
    catch (err) {
        next(err);
    }
});
export default router;
