const Joi = require('joi');
const express = require('express')
const app = express();

app.use(express.json())

const genres = [
    { id: 1, name: 'Comedy' },
    { id: 2, name: 'Romance' },
    { id: 3, name: 'Thriller' },
    { id: 4, name: 'Horror' },
    { id: 5, name: 'Action' },
    { id: 6, name: 'Western' },
    { id: 7, name: 'Science Fiction' },
    { id: 8, name: 'Fantasy' },
    { id: 9, name: 'Drama' },
    { id: 10, name: 'Animation' },
    { id: 11, name: 'Musical' },
    { id: 12, name: 'Documentary' }
]

// Get
app.get('/', (req, res) => {
    res.send("Hello World");
    console.log("New Connection")
})

// Return Genres
app.get('/api/genres', (req, res) => {
    res.send(genres)
})

// Create New Genres
app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre) 
    res.send(genre)
})

// Update a Genre
app.put('api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The given genre could not be found.");

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre)
})

// Delete a Genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The given genre could not be found.");

    index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genre)
})



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


