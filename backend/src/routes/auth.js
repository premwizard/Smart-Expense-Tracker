import express from 'express';
import { body } from 'express-validator';
import validateRequest from '../middlewares/validateRequest.js';
import { supabase } from '../services/supabaseClient.js';
const router = express.Router();
router.post('/signup', [body('email').isEmail().withMessage('Valid email is required.'), body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')], validateRequest, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(201).json({ user: data.user });
    }
    catch (error) {
        next(error);
    }
});
router.post('/signin', [body('email').isEmail(), body('password').isLength({ min: 8 })], validateRequest, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        return res.json({ session: data.session, user: data.user });
    }
    catch (error) {
        next(error);
    }
});
export default router;
