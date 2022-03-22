// Axios allows us to make HTTP requests from both the browser and Node. js applications.

import express from 'express'
import axios from 'axios'
import fileUpload from 'express-fileupload' // for file upload at endpoint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import * as fs from 'fs'

const app = express()

app.use(fileUpload());
app.use(express.json());    

const port  = process.env.PORT || 3000


app.listen(port,()=>{
    console.log(`server runs at ${port}`)
})

const getRequest = () =>{
    axios.get('https://api.github.com/users/mapbox', { // this endpoint call autometically
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
      // handle success
    console.log(response);
  })
  .catch(function (error) {
      // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });  
}

const postRequest = () =>{
    axios.post('/user', { //  end point should be valid
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

// getRequest();
// postRequest();


//----> uploading text file and read that

app.post('/upload-file', async(req, res) =>{
  try{
  
    // console.log(req.files); // the uploaded file object
    let file = req.files.file
    let bufferData = new Buffer(file.data,'base4').toString('ascii')
    console.log(bufferData)
    fs.writeFile('info.txt', data, function (err) {
      if (err) return console.log(err);
    });
    res.send(bufferData)
  }catch(err){
    console.log('error',err)
  }
  
});


// ---> uploading image,pdf etc... and read the data and store but care about extension
// before saving like below given in profile.pdf

app.post('/upload-img',async(req,res)=>{

    let data = req.files.file.data // taking data in bytes (ascii)

    fs.writeFile('profile.pdf', data, function (err) { // writing in a file ,that is pdf file,it can be image also
      if (err) return console.log(err);
    });
    res.send('success')
})
