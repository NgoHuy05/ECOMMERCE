import authRouter from './auth.route.js';

export default (app) => {
    app.use('/auth', authRouter);
};
