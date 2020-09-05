import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';

import { loggerMiddleware } from './logger-middleware';
import { members } from './members';
import { memberRouter } from './routes/api/member.api-routes';

const app = express();

// app.use(loggerMiddleware);

// Initialise body parser.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars (templating engine) initialisation.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/hello', (req, res) => {
  res.send('<h1>Hello World<h1>');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/members', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
);

// The 'use' method is for adding middleware.
// This serves static files.
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', memberRouter);

const PORT = process.env.PORT || 5060;

app.listen(PORT, () => console.log(`[server]: Server running at http://localhost:${PORT}`));
