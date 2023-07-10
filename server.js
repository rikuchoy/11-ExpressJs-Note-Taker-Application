const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
