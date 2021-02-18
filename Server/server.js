const express=require("express")
const app= express()
const bodyParser=require("body-parser")
const cors=require("cors")
const port= process.env.PORT || 5000
const mongoose=require("mongoose")



//middlewares 
app.use(bodyParser.json())
app.use(cors())




//mongoose connection 
mongoose.connect("mongodb+srv://siddique:sdqrdqmdq@cluster0.wgisw.mongodb.net/moviesDB?retryWrites=true&w=majority",
{useNewUrlParser:true},{useunifiedTopology:true})

//movie schema
const movieSchema={
    title:String,
    genre:String,
    year:String
}
//model
const Movie=mongoose.model("Movie",movieSchema)

//routes
app.get("/movies",(req,res)=>{
    Movie.find().then((movies)=>{
        res.json(movies)
    })
})
//add mopvie
app.post("/newmovie",(req,res)=>{
const title=req.body.title
const genre=req.body.genre
const year=req.body.year
const newMovie =new Movie({
    title,
    genre,
    year

})


newMovie.save()
alert("movie sent to db")
})

//delete movie
app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id
    Movie.findByIdAndDelete({_id:id}).exec((err,data)=>{
       if(err){
           console.log("error in deleting movie")
       }else{
           console.log("no error in deleting movie")
   
   
       }
   })
   })


//working on db
 

//app listening on port
app.listen(port,()=>{
    console.log("App is working from server side")
})
// mongo "mongodb+srv://cluster0.wgisw.mongodb.net/moviesDB" --username siddique
