const { connectDB, disconnectDB } = require('./utils/connect');
const User = require('./models/user');
const Recipe = require('./models/Recipe');

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log('Connected to the database');

        // Clear existing data
        await User.deleteMany({});
        await Recipe.deleteMany({});

        // Seed Users (Chefs)
        const users = await User.create([
            {
                name: 'Alice Chef',
                email: 'alice@recipebook.com',
                password: 'password123'
            },
            {
                name: 'Bob Cook',
                email: 'bob@recipebook.com',
                password: 'password123'
            }
        ]);

        // Seed Recipes
        const recipes = await Recipe.create([
            {
                title: 'Spaghetti Carbonara',
                description: 'Classic Italian pasta dish with creamy sauce.',
                ingredients: [
                    'Spaghetti',
                    'Eggs',
                    'Parmesan cheese',
                    'Bacon',
                    'Black pepper'
                ],
                instructions: [
                    'Boil the pasta.',
                    'Cook bacon until crispy.',
                    'Mix eggs and cheese.',
                    'Combine everything together.'
                ],
                cookingTime: 30,
                servings: 2,
                category: 'Non-Veg',
                createdBy: users[0]._id
            },
            {
                title: 'Chocolate Cake',
                description: 'Rich and moist chocolate cake.',
                ingredients: [
                    'Flour',
                    'Cocoa powder',
                    'Sugar',
                    'Eggs',
                    'Butter'
                ],
                instructions: [
                    'Preheat oven to 180°C.',
                    'Mix dry ingredients.',
                    'Add wet ingredients.',
                    'Bake for 35 minutes.'
                ],
                cookingTime: 60,
                servings: 6,
                category: 'Dessert',
                createdBy: users[0]._id
            },
            {
                title: 'Veg Fried Rice',
                description: 'Quick and easy vegetable fried rice.',
                ingredients: [
                    'Rice',
                    'Carrots',
                    'Beans',
                    'Soy sauce',
                    'Spring onions'
                ],
                instructions: [
                    'Cook rice and let it cool.',
                    'Stir fry vegetables.',
                    'Add rice and soy sauce.',
                    'Mix well and serve.'
                ],
                cookingTime: 25,
                servings: 3,
                category: 'Veg',
                createdBy: users[1]._id
            }
        ]);

        console.log('Database seeded successfully');

        await disconnectDB();

    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

module.exports = { seedDatabase };
