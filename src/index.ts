import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import "./configs/data-source";
import cors from 'cors';
import router from './domains/routers';
 import { handleException } from './utilities/errorHandler';
import bodyParser  from 'body-parser';
import path from 'path';


dotenv.config();

const app: Express = express();

app.use(cors(), express.json(), express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/image',express.static(path.join(__dirname, './uploads')));
app.use("/user", router.userRouter);
app.use("/user/recipe", router.recipeRouter)
app.use(handleException);

app.get('/user/user/test', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});
