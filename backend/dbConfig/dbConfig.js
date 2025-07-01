import { error } from 'console';
import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', () => {
            console.log('MongoDB connection error. Please make sure MongoDB is running', error);
        })
    } catch (error) {
        console.log("Error in connect");
        console.log(error);
    }
}