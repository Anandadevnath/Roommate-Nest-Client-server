import express from 'express';
import cors from 'cors';
import roommateRoutes from './routes/roommate.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.use('/roommates', roommateRoutes);

app.get('/', (req, res) => {
  res.send('RoommateFinder API is running! 🚀');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
