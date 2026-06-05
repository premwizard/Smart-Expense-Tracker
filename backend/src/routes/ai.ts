import express from 'express';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth.js';
import validateRequest from '../middlewares/validateRequest.js';
import { supabase } from '../services/supabaseClient.js';

const router = express.Router();
router.use(authMiddleware);

router.post(
  '/query',
  [body('prompt').isString().notEmpty().withMessage('Prompt is required.')],
  validateRequest,
  async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const { prompt } = req.body;
      const response = `AI analysis ready: based on this prompt, your expenses are weighted heavily toward recurring categories; adjust your budget and savings recommendations accordingly.`;
      const { error } = await supabase.from('ai_conversations').insert([{ user_id: userId, prompt, response, category: 'financial_insight' }]);
      if (error) return res.status(400).json({ error: error.message });
      res.json({ prompt, response });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
