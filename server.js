const express = require('express')
const fileUpload = require('express-fileupload');
const path = require('path');


const app = express();

app.all('/upload', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(fileUpload({
    createParentPath: true,
}));

let dataResponse = []

app.post('/upload', (req, res, next) => {
    if(! req.files) {
        return res.status(400).json({msg: "No file uploaded"});
    }

    const file = req.files.file;

    if (!file) return res.json({msg: "Incorrect input name"})

    const newFileName = encodeURI(file.name);

    file.mv(path.resolve(__dirname, "sounds", newFileName), err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        console.log('file was uploaded')
    })


    const { spawn } = require('child_process');

    const childPython = spawn('python', ['praat.py'])

    childPython.stdout.on('data', (data) => {
        dataResponse = data.toString().split('\n')
        next()
    })


    

})

app.post('/upload', (req, res, next) => {
    res.json({
        localShimmer: dataResponse[0],
        F0: dataResponse[3]
    })
})


app.listen(5000, () => console.log('Server Started...'))