import express from 'express';
import { body, query } from 'express-validator';
import authMiddleware from '../middlewares/auth.js';
import validateRequest from '../middlewares/validateRequest.js';
import { supabase } from '../services/supabaseClient.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', [query('category').optional().isString(), query('search').optional().isString()], validateRequest, async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const { data, error } = await supabase.from('expenses').select('*').eq('user_id', userId).order('date', { ascending: false });
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/recent', async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const { data, error } = await supabase.from('expenses').select('title,category,amount,date').eq('user_id', userId).order('date', { ascending: false }).limit(4);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  [
    body('title').notEmpty(),
    body('amount').isFloat({ min: 0 }),
    body('category').notEmpty(),
    body('date').isISO8601(),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const { title, amount, category, date, notes } = req.body;
      const { data, error } = await supabase.from('expenses').insert([{ user_id: userId, title, amount, category, date, notes }]);
      if (error) return res.status(400).json({ error: error.message });
      res.status(201).json(data[0]);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id', [body('title').optional().notEmpty(), body('amount').optional().isFloat({ min: 0 })], validateRequest, async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const id = req.params.id;
    const updates = req.body;
    const { data, error } = await supabase.from('expenses').update(updates).eq('id', id).eq('user_id', userId).single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const id = req.params.id;
    const { error } = await supabase.from('expenses').delete().eq('id', id).eq('user_id', userId);
    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
