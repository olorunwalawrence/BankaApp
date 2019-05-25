import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import route from './server/route/index';
import passportAuth from './server/middleware/passport';
import swaggerDocument from './swagger.json';

const app = express();

const print = console;

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
passportAuth(passport);
/*= ===========
 APP DOCS
============= */
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', route);

app.set('port', parseInt(process.env.PORT, 10));

app.get('/api/v1', (req, res) => res.status(200).json({
  message: 'this is the application home page'
}));

app.route('/*').all((req, res) => res.status(404).json({
  status: 404,
  error: '404 Route not found'
}));

app.listen(app.get('port'), () => {
  print.log(
    'server is up and running on http://localhost:%d in mode %s',
    app.get('port'),
    app.get('env')
  );
  print.log(' Press CTRL + C to Terminate application');
});

export default app;
