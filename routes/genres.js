const express = require('express')
const  router = express.Router();

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

// Return Genres
router.get('/', (req, res) => {
    res.send(genres)
})

// Create New Genres
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The given genre could not be found.");

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre)
})

// Delete a Genre
router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The given genre could not be found.");

    index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genre)
})

module.exports = router
