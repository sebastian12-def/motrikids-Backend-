import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  telefono: String,
  correo: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Tutor', tutorSchema);
