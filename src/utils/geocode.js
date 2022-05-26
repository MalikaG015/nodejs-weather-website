const request=require('postman-request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoibWFsaWthZ3VsYXRpIiwiYSI6ImNsMzhxNHRpNDAyZTIzaXFmdzE0ZmpncjcifQ.KnQR67zI4SzkQ0gQcy1sAw'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }
        else if(body.features.length===0){
            callback('This location does not exists',undefined)
        }
        else{
            callback(undefined,{
                lat:body.features[0].center[1],
                long:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}
module.exports={
    geocode
}
// const ghj=(x,y)=>{

// }
// Array.filter((x)=>{

// })