import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import v1 from './apis/v1/image-store';
import v2 from './apis/v2/image-store';

const app = express(), port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(v1);
app.use(v2);
app.use('/images', express.static(path.join(__dirname, './library/images')));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
