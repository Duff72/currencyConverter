const { Sequelize } = require('sequelize');
const express = require('express');
const app = express();

const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let favoritePairs = [];

app.post('/saveFavorite', (req, res) => {
    const favorite = req.body;
    // Save the favorite currency pair to the database or perform any other necessary actions
    Favorite.create(favorite);
    console.log('Favorite saved:', favorite);
    res.json({ message: 'Favorite saved successfully' });
});

app.get('/favorites', (req, res) => {
    res.json(Favorite.findAll());
});


const sequelize = new Sequelize( {
  dialect: 'sqlite',
  storage: 'database.sqlite'
});


const Favorite = sequelize.define('Favorite', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,        
        type: Sequelize.INTEGER 
       },
       favoriteBase: {
         allowNull: false,
         type: Sequelize.STRING
       },
       favoriteTarget: {
        allowNull: false,
        type: Sequelize.STRING
       }},{
        freezeTableName: true,
        tableName:'Favorite',
        timestamps:false
       }

      );


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



