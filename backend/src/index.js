import 'dotenv/config';
import app from './app';
const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
    console.log(`AI Expense Tracker API running on http://localhost:${port}`);
});
