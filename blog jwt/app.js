const express = require('express');
const blogRouter = require('./routes/postRoutes');
const loginRouter = require('./routes/loginRoutes');
const middleware = require('./middlewares/middlewares');


const app = express();
app.use(express.json());
app.use(middleware.loggingMiddleware);

app.use(''  , loginRouter);
app.use(''  ,blogRouter);

app.use(middleware.errorMiddleware);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });