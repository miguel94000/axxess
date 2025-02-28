import config from './config';
import express from 'express';
import { connectToDatabase } from './lib/mongoose/mongoose-config';
import { Participation } from './lib/mongoose/models/Participation.model';
import cors from 'cors';

const app = express();
app.use(express.json()); // Pour parser le JSON dans le body
app.use(cors({ origin: 'http://localhost:3000' }));

async function bootstrap() {
  const port = config.port;
  try {
    await connectToDatabase();
    console.log('MongoDb connxion successful');

    // Définition de la route POST pour créer une participation
    app.post('/participation', async (req, res) => {
      const { login } = req.body;
      if (!login) {
        return res.status(400).send('Le champ "login" est requis');
      }

      try {
        const participation = new Participation({ login });
        const savedParticipation = await participation.save();
        const savedParticipationToJSON = savedParticipation.toJSON();
        res.status(201).send({
          id: savedParticipationToJSON.id,
          prize: savedParticipationToJSON.prize,
        });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .send('Erreur lors de la sauvegarde de la participation');
      }
    });

    app.post('/scratched', async (req, res) => {
      const { id, position } = req.body;
      if (!id || typeof position !== 'number') {
        return res.status(400).send('Id, position are required');
      }

      try {
        const participation = await Participation.findById(id);
        if (!participation) {
          return res.status(404).send('Participation not found');
        }
        const isWinning = participation.winningNumbers.includes(position);
        participation.tries += 1;
        if (participation.tries === 3 && participation.nbGoodTries === 3) {
          participation.won = true;
        }
        participation.save();
        res.status(201).send({
          isWinning,
          tries: participation.tries,
          won: participation.won,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error while saving the participation');
      }
    });

    app.get('/participants', async (req, res) => {
      const excludedId = req.query.id as string;
      if (!excludedId) {
        return res.status(400).send('Id is required');
      }

      try {
        const participants = await Participation.find({
          _id: { $ne: excludedId },
        })
          .sort({ updatedAt: -1 })
          .limit(3)
          .select('login won updatedAt');

        res.status(200).json(participants);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error while saving the participation');
      }
    });

    app.listen(port, () => {
      console.log(`Backend server started on port ${port}`);
    });
  } catch (error) {
    console.error('Error while connecting to MongoDb', error);
    process.exit(1);
  }
}

bootstrap();
