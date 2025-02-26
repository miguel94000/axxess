import config from './config';

import express from 'express';

import { connectToDatabase } from './lib/mongoose/mongoose-config';

const app = express();

async function bootstrap() {
  const port = config.port;
  try {
    await connectToDatabase();
    console.log('Connexion à MongoDB réussie');

    // Définissez vos middlewares, routes, etc.
    app.get('/', (req, res) => {
      res.send('Backend opérationnel avec MongoDB !');
    });

    app.listen(port, () => {
      console.log(`Serveur backend démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB', error);
    process.exit(1);
  }
}

bootstrap();
