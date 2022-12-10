import express from 'express';
import cors from "cors";
import categoriesRouter from './routes/categoriesRouter.js';
import gamesRouter from './routes/gamesRouter.js';
import custumersRouter from './routes/customersRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(categoriesRouter);
app.use(gamesRouter);
app.use(custumersRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));