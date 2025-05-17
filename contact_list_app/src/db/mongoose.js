const mongoose = require('mongoose')
const config = require('../../config')

mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,  // npm install mongoose@5.12.15
    useUnifiedTopology: true
})