const config = require('./config/config');

const { sequelize } = require('./models');

const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const { userRoutes, bookRoutes, authorRoutes, installRoutes, multerRoute } = require('./routes');
const auth = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/books', auth.authenticateToken, bookRoutes);
app.use('/authors', auth.authenticateToken, authorRoutes);
app.use('/', installRoutes);
app.use('/', multerRoute);


sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado');
  }).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})