const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

 
// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
      const filteredMovies = movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
      return res.json(filteredMovies)
    }
    res.json(movies)
  })

const  PORT = process.env.PORT ?? 1234

app.listen(PORT, ()=>{
    console.log(`server listen on port http://localhost:${PORT}`);
})