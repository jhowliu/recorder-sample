const path = require('path'),
      express = require('express'),
      exphbs = require('express-handlebars'),
      multer = require('multer'),
      bodyParser = require('body-parser');

const fs = require('fs');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse for form-data
app.use(multer().any())

// static folder path
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', 3999);

app.get('/', function(req, res) {
    res.render('index', {});
});

app.post('/upload', function(req, res) {
    console.log(req);
    const files = req.files;

    if (files === undefined) {
        return res.json({ success: false, message: "failed to upload file." });
    } else {
        const buffer = files[0].buffer;
        const filename = files[0].originalname;

        writeAudio(buffer, filename);
        return res.json({ success: true, message: "start to parsing data." });
    }
});


function writeAudio(buffer, filename) {
    const file = path.resolve('./audio', filename);

    fs.writeFile(file, buffer, function(err) {
        if (err) throw err;
    });
}

app.listen(app.get('port'), 'localhost', function() {
    console.log("Server started on port: " + app.get('port'));    
})


