require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

    async function startServer() {
        try{
            await connectDB();

            const PORT = process.env.PORT || 3000;

            app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            })
        }catch(error){
            console.error('Error starting the server:', error);
            process.exit(1);
        }
    }

startServer();