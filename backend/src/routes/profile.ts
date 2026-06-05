import express from 'express';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth.js';
import validateRequest from '../middlewares/validateRequest.js';
import { supabase } from '../services/supabaseClient.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data || { id: userId });
  } catch (err) {
    next(err);
  }
});

router.put(
  '/',
  [body('full_name').optional().isString(), body('preferred_theme').optional().isIn(['dark', 'light'])],
  validateRequest,
  async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const updates = req.body;
      const { data, error } = await supabase.from('profiles').upsert({ id: userId, ...updates }, { onConflict: 'id' }).select().single();
      if (error) return res.status(400).json({ error: error.message });
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
