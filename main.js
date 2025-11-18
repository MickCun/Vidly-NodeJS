const Joi = require('joi');
const express = require('express')
const app = express();
const genres = require('./routes/genres')

app.use(express.json())
app.use('/api/genres/', genres);

// Set up server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}....`))

// Validate the input
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(genre);
}


