const { seedDatabase } = require('./src/seed');
const { connectDB, disconnectDB } = require('./src/utils/connect');

const User = require('./src/models/user');
const Recipe = require('./src/models/Recipe');

const displayMessage = async () => {
    console.log("Database seeding completed successfully.");

    try {
        await connectDB();

        console.log("\nThe users are:");
        const users = await User.find({});

        users.forEach(user => {
            console.log(`Name: ${user.name}, Email: ${user.email}`);
        });

        console.log("\nThe recipes are:");
        const recipes = await Recipe.find({})
            .populate('createdBy', 'name email');

        recipes.forEach(recipe => {
            console.log(
                `Title: ${recipe.title}, 
Category: ${recipe.category}, 
Cooking Time: ${recipe.cookingTime} mins, 
Created By: ${recipe.createdBy?.name}`
            );
        });

        await disconnectDB();

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

const startApp = async () => {
    await seedDatabase();
    await displayMessage();
};

startApp();
