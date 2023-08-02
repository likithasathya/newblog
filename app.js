const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');

const app = express();
const port = 3000;

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set up static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/news', async (req, res) => {
    try {
        const { interest } = req.query;
        const apiKey = 'YOUR_NEWSAPI_KEY'; // Replace with your NewsAPI key

        const response = await axios.get(`https://newsapi.org/v2/everything?q=${interest}&apiKey=${apiKey}`);
        const data = response.data;

        const articles = data.articles;
        res.render('news', { articles });
    } catch (err) {
        console.error('Error fetching news:', err.message);
        res.render('error');
    }
});
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
