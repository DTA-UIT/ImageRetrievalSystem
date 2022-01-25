const multer  = require('multer'); 
const path = require('path');
const fs = require("fs");
const Cropper = require('cropperjs');
const sharp = require('sharp');
const { PassThrough } = require('stream');


const runningOn = "http://localhost:3000/";
// const runningOn = "https://dta-cs336.herokuapp.com/";

function route(app){ 
    app.get('/', (req, res) => { 
        return res.render('home');
    });

    app.get('/', (req, res) => {   
        return res.render('home');
    });

    app.get('/upload', (req, res) => { 
        return res.render('upload');
    }); 
 
    const storage_image = multer.diskStorage({
        destination: (req, file, cb) => {cb(null, path.join(__dirname, '../public/img/'));},
        filename: (req, file, cb) => {cb(null, file.originalname);}
    });
    const upload_image = multer({ storage: storage_image});  

    app.post('/upload', upload_image.single('data_image'), (req, res) => { 
        if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
            fs.rename(
                path.join(__dirname, '../public/img/', req.file.originalname), 
                path.join(__dirname, '../public/img/', 'image_input.jpg'), 
                (err) => {
                    if (err) throw err;
                }
            );
            return res.redirect('/drop');
        } 
        else{
            alert(path.extname(req.file.originalname).toLowerCase() + ' is not supported !\nPlease upload a .jpg file!');
            fs.unlinkSync(path.join(__dirname, '../public/img/', req.file.originalname));
            return res.render('NOT_SUPPORTED_IMAGE_FORMAT');
        }
    }); 

    app.get('/drop', (req, res) => {
        return res.render('drop');
    });

    app.post('/drop', (req, res) => {
        let coordinate = {
            xtop: req.body['xtop'],
            ytop: req.body['ytop'],
            xbot: req.body['xbot'],
            ybot: req.body['ybot'],
        }
        
        /*
        Link to python backend 
        */

        const { spawn } = require('child_process');
        let inputImage = path.join(__dirname, '../../src/public/img/image_input.jpg');
        let outputImage = path.join(__dirname,'../../src/public/img/image_output.jpg');
        const path_script = path.join(__dirname, '../public/script/cnnimageretrieval-pytorch/test.py');
        const pythonProcess = spawn('python',
                                    [path_script, 
                                    coordinate.xtop, 
                                    coordinate.ytop, 
                                    coordinate.xbot, 
                                    coordinate.ybot,
                                    inputImage,
                                    outputImage
                                ]); 

        pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString());
            res.write(data);
            res.end('end');
        });
        setTimeout(function () {
            return res.redirect('/query');   
        }, 18000);
        
    }); 
    app.get('/query', (req, res) => {
        return res.render('query');
    });  
}

function getImageName(url){
    return url;
}


module.exports = route;

