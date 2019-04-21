import express from 'express';
import bodyParser from 'body-parser';
import route from './server/route/index';



const app = express();

const port = process.env.PORT || 9000;

const print = console;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', route);
app.get('/api/v1', (req, res) => res.status(200).json({
  message: 'this is the application home page'
}));

app.route('/*').all((req, res) => res.status(404).json({
  status: 404,
  error: '404 Route not found'
}));

app.listen(port, () => {
  print.log('server is up and running');
});

export default app;
