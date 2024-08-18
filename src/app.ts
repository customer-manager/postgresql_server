import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { initializePassport } from './comman/strategy/jwt-strategy';
import { initializeLocalPassport } from './comman/strategy/local-strategy';
import authRouter from './routes/auth.router';
import { AuthService } from './services/auth.service';
import { authenticateToken } from './comman/middlewares/auth.middleware';
import { DataSource } from 'typeorm';
import cors from 'cors';
import customerRouter from './routes/customer.router';
import { UserEntity } from './models/user.model';
import { CustomerEntity } from './models/customer.model';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
const port = 5000;

// Initialize AuthService
const authService = new AuthService();

// Initialize Passport
initializePassport(authService);
initializeLocalPassport(authService);

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/customer", customerRouter);

app.get('/', authenticateToken, (req, res) => {
  res.send('Hello NOD Readers!');
});

// Initialize DataSource
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  url: `${process.env.POSTGRES_URL}`, 
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [UserEntity, CustomerEntity],
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`Express server is listening at http://localhost:${port} 🚀`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
  });
