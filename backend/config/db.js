import mongose from 'mongoose'
import colors from 'colors'

// a mongoose stuf (mongoose.connect ....) return always a promise
const connectDB = async () => {
    try{
        //Add MONGO_URI in dotenv file and assign value of your database 
        const conn = await mongose.connect("mongodb+srv://yashjani30201:ngwah5W9mFXJlOPx@cluster0.1lc3kga.mongodb.net/",{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
      console.error(`Error: ${error.message}`.red.underline.bold)
            process.exit(1)
    }
}

export default connectDB