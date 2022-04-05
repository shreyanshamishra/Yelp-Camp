const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '6243fe525e03a5f534145a69',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Passion for travelling',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [ 
                {
                      url: 'https://res.cloudinary.com/lethlalmishra/image/upload/v1648830904/YelpCamp/snkfvvb2p2cayki6uhjp.jpg',
                      filename: 'YelpCamp/snkfvvb2p2cayki6uhjp',
                 }, 
                 {
                      url: 'https://res.cloudinary.com/lethlalmishra/image/upload/v1648830900/YelpCamp/s7u8dcjcsoujumpqb10n.jpg', 
                      filename: 'YelpCamp/s7u8dcjcsoujumpqb10n' 
                    }
                 ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})