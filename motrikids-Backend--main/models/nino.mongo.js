import mongoose from 'mongoose';

const ninoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    min: 6,
    max: 8,
    required: true
  },
  grado: String,
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Nino', ninoSchema);
