import mongoose from 'mongoose';

const roommateSchema = new mongoose.Schema({
  title: String,
  location: String,
  rent: Number,
  roomType: String,
  lifestyle: [String],
  description: String,
  contactInfo: String,
  availability: { type: String, enum: ['available', 'not available'], default: 'available' },
  userEmail: String,
  userName: String,
  likeCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Roommate', roommateSchema);
