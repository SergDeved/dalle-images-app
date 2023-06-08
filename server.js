const PORT = 8000
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const multer = require('multer')
const app = express()

app.use(cors())
app.use(express.json())
require('dotenv').config()


const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({storage: storage}).single('file')
let filePath

app.post('/images', async (req, res) => {
    try {
        const response = await openai.createImage({
            prompt: req.body.message,
            n: 3,
            size: "1024x1024",
        })
        res.send(response.data.data)

    } catch (error) {
        console.error(error)
    }

})

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        filePath = req.file.path;
        res.json({ message: 'File uploaded successfully' }); // Enviar respuesta como JSON
    });
});



app.post('/variations', async(req,res) => {
    try{
        const response = await openai.createImageVariation(
            fs.createReadStream(filePath),
            3,
            "1024x1024"
        )

        res.send(response.data.data)
    }catch (error){
        console.error(error)
    }
})
app.listen(PORT, () => console.log('Sever running on PORT ' + PORT))

