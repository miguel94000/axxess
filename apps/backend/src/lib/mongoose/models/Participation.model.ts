import mongoose, { Document, Model } from 'mongoose';

export interface IParticipation extends Document {
  login: string;
  won: boolean;
  date: Date;
  winningNumbers: number[];
  tries: number;
  nbGoodTries: number;
  prize: string;
  createdAt: Date;
  updatedAt: Date;
}

const generateWinningNumbers = (): number[] => {
  const numbers = new Set<number>();
  while (numbers.size < 3) {
    numbers.add(Math.floor(Math.random() * 9));
  }
  return Array.from(numbers);
};

const prizes = [
  '500 000 euros',
  'voiture',
  'tapis de course',
  'ballon',
  'cuillière',
];

const generatePrize = (): string => {
  const index = Math.floor(Math.random() * prizes.length);
  return prizes[index];
};

const ParticipationSchema = new mongoose.Schema<IParticipation>(
  {
    login: { type: String, required: true },
    won: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    winningNumbers: {
      type: [Number],
      required: false,
      default: generateWinningNumbers,
    },
    tries: { type: Number, default: 0 },
    nbGoodTries: { type: Number, default: 0 },
    prize: {
      type: String,
      required: false,
      default: generatePrize,
    },
  },
  { timestamps: true }
);

ParticipationSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Pour éviter l'erreur de compilation multiple en mode hot reload
export const Participation: Model<IParticipation> =
  mongoose.models.Participation ||
  mongoose.model<IParticipation>('Participation', ParticipationSchema);
