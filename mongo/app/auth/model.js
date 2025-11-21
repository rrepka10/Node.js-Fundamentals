// For user login information
import mongoose from 'mongoose';

// The login schema 
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Export the user object
export const User = mongoose.model('User', userSchema);