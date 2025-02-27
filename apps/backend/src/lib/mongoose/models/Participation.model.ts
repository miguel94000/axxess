import mongoose, { Document, Model } from 'mongoose';

export interface IParticipation extends Document {
  login: string;
  won: boolean;
  date: Date;
}

const ParticipationSchema = new mongoose.Schema<IParticipation>({
  login: { type: String, required: true },
  won: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
});

// Pour éviter l'erreur de compilation multiple en mode hot reload
export const Participation: Model<IParticipation> =
  mongoose.models.Participation ||
  mongoose.model<IParticipation>('Participation', ParticipationSchema);
