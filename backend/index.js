const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/print', (req, res) => {
    const message = req.body.message;
    console.log(message);
    res.send({status: 'Message printed to console'});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
