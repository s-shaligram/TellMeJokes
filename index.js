// importing express libraries
let express = require('express')
let bodyParser = require('body-parser')
let https = require('https')

// create app
let app = express()

// configure body the app to use the body parser to be able handle json body
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

console.log('I discovered that plagiarism is a synonym for copying and pasting.')

// start listening an port #443

let portNumber = 443

app.listen(portNumber, () =>{
    // https://v2.jokeapi.dev/joke
    console.log(`Server listening on port ${portNumber}`)
})

// joke array to store jokes

let Jokes = [

    {
        "id": "1",
        "category": "Programming",
        "joke" : "UDP is better in the COVID era since it avoids unnecessary handshakes.",
    },

    {
        "id": "2",
        "category": "Programming",
        "joke": "Java is like Alzheimer's, it starts off slow, but eventually, your memory is gone."
    }
]

// http://localhost:4000/getAllJokes

app.get('/getAllJokes', (req, res, next) =>{

    console.log('User hit endpoint \\getAllJokes')
    let data = Jokes

    if (data){

        console.log(data)
        res.send(data)
    } else {
        res.status(404).send({
            message: "Bad joke. No laughs!"
        })
    }
    
})

// http://localhost:4000/getJoke

app.get('/getJoke', (req, res, next) =>{

    console.log('User hit endpoint \\getJokeByID')
    let jokeID = req.query.jokeID
    let data = Jokes.find((joke) => joke.id == jokeID)

    if(data){

        console.log("Data: ",data)

        res.send(data)
    } else{
        res.status(404).send({
            message: "JokeID not valid. Response not found!"
        })
    }
})

// http://localhost:4000/addJoke

app.post('/addJoke', (req, res, next) => {
    console.log('User hit endpoint \\addNumber')

    let data = req.body
    let data_id = data.id
    let flag = false
    Jokes.find((joke) => {
        // console.log(joke.id)
        // console.log(data_id)
        if(joke.id == data_id){
            flag = true
            console.log(flag)
        }
    })

    console.log("JokeID flag ", flag)
    
    console.log("JokeID added", data.id)

    if(data_id == '' || data_id == undefined || data.category == "" || data.category == undefined || data.joke == "" || data.joke == undefined) {
        
            res.status(404).send({
                message: "Bad request. Joke details not provided!"
            }) 
    } else {

        // console.log(data_id)
        if(flag){
            res.status(403).send({
                message: "Bad request. Duplicate jokeID provided!"
            })
        } else{

            console.log(data)
            Jokes.push(data)
            res.send(data) 
        }
    }
})

// endpoint to listen to in your Express app: /getProgrammingJokes
app.get('/getProgrammingJokes', (req, res, next) =>{

    console.log('User hit endpoint \\getProgrammingJokes')

    // query parameter called maxJokes to specify the number of jokes to return
    let maxJokes = req.query.maxJokes

    let baseURL = 'https://v2.jokeapi.dev/joke'
    let category = '/Programming'
    let flags = '?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    let type = '&type=twopart'
    let amount = '&amount='
    let endP = baseURL + category + flags + type + amount

    let endpoint =  getEndpoint(endP, maxJokes)

        https.get(endpoint, (apiRes) => {
            let dataBuffer = []
    
            apiRes.on('data', (chunk) => {
                console.log('chunk received')
                dataBuffer.push(chunk)
            })
    
            apiRes.on('end', () => {
                console.log('Response completed!')
                let dataString = Buffer.concat(dataBuffer).toString()
                // convert the data to JSON
                let jsonObj = JSON.parse(dataString)
                // console.log(jsonObj)
                // console.log(Object.keys(jsonObj).length)
                var arr =[]
                if(!jsonObj.hasOwnProperty('jokes')){
                   var arr1 = []
                   arr1.push(jsonObj)
                   arr = jokeArr(arr1)
                   console.log(arr)
                }
                else{
                   arr = jokeArr(jsonObj.jokes)
                   console.log(arr)
                }

                // response back to the calling client
                res.status(200).send(arr)
            })
        })
        .on('error', (err) => {
            console.log('Error:' + err.message)
        })

})

//function to Adapt the JSON response
function jokeArr(data){

    var arr = []
    var obj = {}

    data.forEach(element => {
        obj.id = element.id
        obj.setup = element.setup
        obj.delivery = element.delivery

        arr.push(obj)
        obj = {}
    });

    return arr
}

// function to return back the the number of jokes based on what the user specified for maxJokes
function getEndpoint(endP, maxJokes){

    var endPoint = ''

    if(maxJokes == null || maxJokes == 0 || maxJokes == undefined){
        maxJokes = 5
        endPoint = endP+maxJokes
    } 
    else{
        endPoint = endP+maxJokes
    }

    return endPoint
}