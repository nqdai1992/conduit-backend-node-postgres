import express from 'express';
import errorMiddleware from '../errorHandler/errorMiddleware';
import passport from '@/middlewares/auth.middleware';
import SignUpController from '@/controllers/SignUpController';
import SignUpUseCase from '@/user-cases/signup/SignUpUseCase';
import SignUpPersistence from '@/persistences/SignUpPersistence';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use(
  SignUpController(
    new SignUpUseCase(
      SignUpPersistence
    )
  )
)

// app.use(UserSignInController)
// app.use(GetCurrentUserController)
// app.use(UpdateUserController)
// app.use(GetProfileController)
// app.use(FollowUserController)
// app.use(UnfollowUserController)
// app.use(CreateArticleController)
// app.use(FavoriteArticleController)
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
