/* eslint-disable no-console */
import '@babel/polyfill';
import express from 'express';
import fileupload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';

const app = express();

app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileupload({ useTempFiles: true }));
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}...`));

export default app;
