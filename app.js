const path = require('path'),
      express = require('express'),
      exphbs = require('express-handlebars'),
      multer = require('multer'),
      bodyParser = require('body-parser');


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
    const files = req.files;

    if (files === undefined) {
        return res.json({ success: false, message: "failed to upload file." });
    } else {
        console.log(files);
        return res.json({ success: true, message: "start to parsing data." });
    }
});

app.listen(app.get('port'), function() {
    console.log("Server started on port: " + app.get('port'));    
})


