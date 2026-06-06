import { supabase } from '../services/supabaseClient.js';
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization?.replace('Bearer ', '') ?? '';
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization token required.' });
        }
        const { data, error } = await supabase.auth.getUser(authHeader);
        if (error || !data.user) {
            return res.status(401).json({ error: 'Invalid or expired token.' });
        }
        req.user = { id: data.user.id, email: data.user.email ?? '' };
        next();
    }
    catch (error) {
        next(error);
    }
};
export default authMiddleware;
