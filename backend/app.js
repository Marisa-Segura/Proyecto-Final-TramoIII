import express  from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from 'env';

import { postsRouter } from "./routes/post-routes.js";
import { usersRouter } from "./routes/user-routes.js";
import { authValidation } from "./middlewares/authValidation.js";
import { startConnection } from "./settings/database.js";

const app = express();
//Middlewares for the routes that require authentication and authorization

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.use(express.json());

//app.use(authValidation);

app.use("/posts", authValidation, postsRouter);

app.use("/users", usersRouter);

app.listen(env.PORT, async() => {
  await startConnection
    console.log(`Server running on port ${env.PORT}`);
});

