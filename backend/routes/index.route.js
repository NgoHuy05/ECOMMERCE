import authRouter from './auth.route.js';
import userRouter from './user.route.js';
export default (app) => {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
};
