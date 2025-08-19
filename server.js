import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { connectDB } from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import opmRoutes from './routes/opmRoutes.js';
import smRoutes from './routes/smRoutes.js';
import adminOrderRoutes from './routes/adminOrderRoutes.js';

const app = express();


app.use(cors());
app.use(express.json());

connectDB();

app.use('/uploads', express.static('uploads'));

app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/opm', opmRoutes);
app.use('/api/sm', smRoutes);
app.use('/api/admin/orders', adminOrderRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost: ${process.env.PORT}`));
