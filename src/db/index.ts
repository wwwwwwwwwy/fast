import mongoose from 'mongoose';
import config from '../config/db.json';

export const database = ()=>{
    mongoose.set('debug', true)

    mongoose.connect(config.url,{
      connectTimeoutMS:1000,
      useNewUrlParser: true,
      useUnifiedTopology:true
    })
  
    mongoose.connection.on('disconnected', () => {
      mongoose.connect(config.url)
    })
    mongoose.connection.on('error', console.error)
  
    mongoose.connection.on('open', async () => {
      console.log('Connected to MongoDB ', config.url)
    })
}