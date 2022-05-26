const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')



const app=express()
// for dynamic files rendering
app.set('view engine','hbs')
const viewsPath=path.join(__dirname,'../templates/views')
app.set('views',viewsPath)
// partials setup
const partialsPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

//console.log(path.join(__dirname,'../public'))

//app.use->way tocustomize your server
app.use(express.static(path.join(__dirname,'../public')))

//app.get tells the server what to do when a specific route is hit


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"please provide address"
        })
    }
    
    geocode.geocode(req.query.address,(error,{lat,long,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast.forecast(lat,long,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            return res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
    
            })
        })
    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather app",
        name:" Malika Gulati"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"Google logo",
        name:"Sundar pichai"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"malika",
        msg:"These are some help options"
    })
})
app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404 page',
    name:'malika gulati',
    errorMessage:'help article not found'
      
  })

})
app.get('*',(req,res)=>{
res.render('404',{
    title:'404 page',
    name:'malika gulati',
    errorMessage:'This page does not exist'
})
})


//start the server
app.listen(3000,()=>{
    console.log("server started at port 3000")
})
//1.css and img route in about.hbs
//2.line 7 and 8 in app.js