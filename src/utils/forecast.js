const request = require("postman-request")
const forecast=(lat,long,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=39a59555af6565316be7cb24dbec901b&query=lat,long&units=f"
    request({url,json:true},(error,{body})=>{
    if(error){
        callback('unable to connnect with weather service',undefined)
     }
    else if(body.error){
        callback('Unable to find location',undefined)
    }
    else{
        callback(undefined,body.current.weather_descriptions[0]+ ". The current temperature is "+ body.current.temperature+ " fahrenheit and it feels like "+ body.current.feelslike +" fahrenheit.")
            
            // description:body.current.weather_descriptions[0],
            // current_tempertaure:body.current.temperature,
            // feelsLike:body.current.feelslike
        
    }
})
}
module.exports={
    forecast
}
