import express from 'express';
import UserSignUpController from '@/user-cases/user-signup/user-signup.controller';
import UserSignInController from '@/user-cases/user-signin/user-signin.controller';
import errorMiddleware from '../errorHandler/errorMiddleware';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(UserSignUpController)
app.use(UserSignInController)

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
