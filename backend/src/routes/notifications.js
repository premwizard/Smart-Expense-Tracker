import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { supabase } from '../services/supabaseClient.js';
const router = express.Router();
router.use(authMiddleware);
router.get('/', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { data, error } = await supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false });
        if (error)
            return res.status(400).json({ error: error.message });
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
router.post('/mark-read', async (req, res, next) => {
    try {
        const userId = req.user.id;
        await supabase.from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false);
        res.json({ message: 'All notifications marked as read.' });
    }
    catch (err) {
        next(err);
    }
});
export default router;
