import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react"
import axios from "axios"

function App() {

  const [movies,setMovies]=useState([
    {
      title:"",
      genre:"",
      year:""
    }
  ])

  const [movie,setMovie]=useState({
    title:"",
    genre:"",
    year:""

})

  useEffect(()=>{
    fetch("/movies").then( res=>{
      if(res.ok){
        return res.json()
      }
    }).then(jsonres=>{
      
      setMovies(jsonres)

    })
  })
  const addMovie=(e)=>{
    e.preventDefault()
      alert("Movie addded")
      const newMovie={
        title:movie.title,
        genre:movie.genre,
        year:movie.year
      }
      axios.post('/newmovie',newMovie)
     
  }
  const deletemovie=id=>{
    axios.delete(`/delete/${id}`)
    alert(id)
  }

  const handelchange=(e)=>{
      const{name,value}=e.target
      setMovie(prevInp=>
          {
            return {
              ...prevInp,
              [name]:value,
            }
          }
        )
  }
  return (
    
    <div className="App"> 
       <h1>Add movie</h1>
      <div>
      <form>
      <input onChange={handelchange} value={movie.title} name="title"></input>
      <input onChange={handelchange} value={movie.genre} name="genre"></input>

      <input onChange={handelchange} value={movie.year} name="year"></input>

        
        <button onClick={addMovie}>Add movie</button>

      </form>
      
      
      
      </div>

     
      
      {movies.map(movie=>{
        return (
          <div>
            <h1>{movie.title}</h1>
            <h1>{movie.genre}</h1>

            <h1>{movie.year}</h1>
            <button onClick={()=>deletemovie(movie._id)}>Delete</button>

          </div>
        )
        
        
      })}
    </div>
  );
}

export default App;
