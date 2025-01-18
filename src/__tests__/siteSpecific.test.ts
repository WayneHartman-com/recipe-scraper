import getRecipeData from '../index'
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getRecipeData', () => {
    it('should correctly parse information from a sample recipe from HelloFresh.com', async () => {
        const url = 'https://www.hellofresh.com/recipes/mozzarella-crusted-chicken-5845b27b2e69d7646110f1c2'
        const htmlFilePath = path.resolve(__dirname, 'html/hello-fresh.html')
        const html = fs.readFileSync(htmlFilePath, 'utf-8')
        mockedAxios.get.mockResolvedValue({ data: html })

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.name).toBe('Mozzarella-Crusted Chicken with Blistered Tomatoes and Potato Wedges');
        expect(recipe.image).toBe('https://img.hellofresh.com/f_auto,fl_lossy,h_640,q_auto,w_1200/hellofresh_s3/image/de-mozzarella-crusted-chicken-w0-4336bddd.jpg');
        expect(recipe.description).toBe('Think of this recipe as a new take on chicken Parmesan. Herbs, breadcrumbs, and mozzarella are heaped onto chicken to create glorious crown of a crust. In place of marinara, roasted tomatoes add a sweet and tangy punch. On the side, you’ve also got some crispy potatoes because, hey, why not?');
        expect(recipe.cookTime).toBe(undefined);
        expect(recipe.prepTime).toBe(undefined);
        expect(recipe.totalTime).toBe('30 minutes');
        expect(recipe.recipeYield).toBe(2);
        expect(recipe.recipeIngredients).toEqual([
            "12 ounce Chicken Breasts",
            "1/2 cup Mozzarella Cheese",
            "2 unit Roma Tomato",
            "1/2 cup Panko Breadcrumbs",
            "1 teaspoon Paprika",
            "12 ounce Yukon Gold Potatoes",
            "1 teaspoon Dried Oregano",
            "4 teaspoon Olive Oil",
            "unit Salt",
            "unit Pepper",
        ]);
        expect(recipe.recipeInstructions).toEqual([
            "Wash and dry all produce. Preheat oven to 425 degrees. Cut potatoes into ½-inch-thick wedges, like steak fries. Core and quarter tomatoes.",
            "Toss potatoes on one side of a foil-lined baking sheet with a drizzle of olive oil and a pinch of salt and pepper. On other side of baking sheet, toss tomatoes with a drizzle of olive oil and a pinch of salt and pepper. Roast until potatoes are crispy and tomatoes are very soft, 25-30 minutes, tossing halfway through.",
            "Mix panko, oregano, paprika, mozzarella, a drizzle of olive oil, and a pinch of salt and pepper in a small bowl.",
            "Season chicken breasts all over with salt and pepper. Rub with a drizzle of olive oil. Place on a second baking sheet.",
            "Add a layer of panko crust to top of each chicken breast, gently pressing to adhere. Pile topping as high as possible (you may have some left over).",
            "Bake chicken until meat is cooked through and topping is golden brown, about 20 minutes. Serve with potato wedges and roasted tomatoes.",
        ]);
        expect(recipe.recipeCategories).toEqual([
            'main course'
        ]);
        expect(recipe.recipeCuisines).toEqual([
            'North America'
        ]);
        expect(recipe.keywords).toEqual([
            'SEO'
        ]);
    });

    it('should throw an error if the URL is invalid', async () => {
        await expect(getRecipeData('invalid-url')).rejects.toThrow('Url must start with http:// or https://');
    });

    it('should correctly parse information from a sample recipe from americastestkitchen.com', async () => {
        const url = 'https://www.americastestkitchen.com/recipes/6843-best-prime-rib'
        const htmlFilePath = path.resolve(__dirname, 'html/americas-test-kitchen.html')
        const html = fs.readFileSync(htmlFilePath, 'utf-8')
        mockedAxios.get.mockResolvedValue({ data: html })

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.name).toBe('Best Prime Rib');
        expect(recipe.image).toBe('https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_150/25851_sfs-best-prime-rib-21');
        expect(recipe.description).toBe('Top chefs say 18 hours in a 120-degree oven is the route to prime rib perfection. What if we told you it was possible in almost one-third the time? The perfect prime rib should have a deep-colored, substantial crust encasing a tender, juicy rosy-pink center. To achieve this perfect roast, we started by salting the roast overnight. The salt enhanced the beefy flavor while dissolving some of the proteins, yielding a buttery-tender roast. To further enhance tenderness, we cooked the roast at a very low temperature, which allowed the meat\'s enzymes to act as natural tenderizers, breaking down its tough connective tissue. A brief stint under the broiler before serving ensured a crisp, flavorful crust.');
        expect(recipe.cookTime).toBe(undefined);
        expect(recipe.prepTime).toBe(undefined);
        expect(recipe.totalTime).toBe(undefined);
        expect(recipe.recipeYield).toBe(null);
        expect(recipe.recipeIngredients).toEqual([
            '1 (7-pound), first-cut beef standing rib roast (3 bones), meat removed from bones, bones reserved',
            ', Kosher salt and ground black pepper',
            '2 teaspoons, vegetable oil',
        ]);
        expect(recipe.recipeInstructions).toEqual([
            'Look for a roast with an untrimmed fat cap (ideally ½ inch thick). We prefer the flavor and texture of prime-grade beef, but choice grade will work as well. To remove the bones from the roast, use a sharp knife and run it down the length of the bones, following the contours as closely as possible until the meat is separated. Monitoring the roast with a meat-probe thermometer is best. If you use an instant-read thermometer, open the oven door as little as possible and remove the roast from the oven while taking its temperature. If the roast has not reached the correct temperature in the time range specified in step 3, heat the oven to 200 degrees, wait for 5 minutes, then shut it off, and continue to cook the roast until it reaches the desired temperature.',
            'Using sharp knife, cut slits in surface layer of fat, spaced 1 inch apart, in crosshatch pattern, being careful to cut down to, but not into, meat. Rub 2 tablespoons salt over entire roast and into slits. Place meat back on bones (to save space in refrigerator), transfer to large plate, and refrigerate, uncovered, at least 24 hours and up to 96 hours.',
            'Adjust oven rack to middle position and heat oven to 200 degrees. Heat oil in 12-inch skillet over high heat until just smoking. Sear sides and top of roast (reserving bone) until browned, 6 to 8 minutes total (do not sear side where roast was cut from bone). Place meat back on ribs, so bones fit where they were cut, and let cool for 10 minutes; tie meat to bones with 2 lengths of twine between ribs. Transfer roast, fat side up, to wire rack set in rimmed baking sheet and season with pepper. Roast until meat registers 110 degrees, 3 to 4 hours.',
            'Turn off oven; leave roast in oven, opening door as little as possible, until meat registers about 120 degrees for rare or about 125 degrees for medium-rare, 30 to 75 minutes longer.',
            'Remove roast from oven (leave roast on baking sheet), tent loosely with aluminum foil, and let rest for at least 30 minutes and up to 75 minutes.',
            'Adjust oven rack about 8 inches from broiler element and heat broiler. Remove foil from roast, form into 3-inch ball, and place under ribs to elevate fat cap. Broil until top of roast is well browned and crisp, 2 to 8 minutes.',
            'Transfer roast to carving board; cut twine and remove roast from ribs. Slice meat into 3/4-inch-thick slices. Season with coarse salt to taste, and serve.',
        ]);
        expect(recipe.recipeCategories).toEqual([
            'Main Courses'
        ]);
        expect(recipe.recipeCuisines).toEqual(undefined);
        expect(recipe.keywords).toEqual([
            'Main Courses',
            'Beef'
        ]);
    });

    it('should correctly parse information from a sample recipe from allrecipes.com', async () => {
        const url = 'https://www.allrecipes.com/recipe/14554/sirloin-steak-with-garlic-butter/'
        const htmlFilePath = path.resolve(__dirname, 'html/all-recipes.html')
        const html = fs.readFileSync(htmlFilePath, 'utf-8')
        mockedAxios.get.mockResolvedValue({ data: html })

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.name).toBe('Sirloin Steak with Garlic Butter');
        expect(recipe.image).toBe('https://www.allrecipes.com/thmb/OJ28fIFte6Pyg93ML8IM-APbu1Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-14554-sirloin-steak-with-garlic-butter-hero-4x3-d12fa79836754fcf850388e4677bbf55.jpg');
        expect(recipe.description).toBe('This grilled sirloin steak recipe includes a super garlicky melted butter that&#39;s made with freshly minced garlic and garlic powder. Simply delicious!');
        expect(recipe.cookTime).toBe('10 minutes');
        expect(recipe.prepTime).toBe('20 minutes');
        expect(recipe.totalTime).toBe('30 minutes');
        expect(recipe.recipeYield).toBe('8');
        expect(recipe.recipeIngredients).toEqual([
            '0.5 cup butter',
            '4 cloves garlic, minced',
            '2 teaspoons garlic powder',
            '4 pounds beef top sirloin steaks',
            'salt and pepper to taste',
        ]);
        expect(recipe.recipeInstructions).toEqual([
            'Gather all ingredients. Preheat an outdoor grill for high heat and lightly oil the grate.',
            'Melt butter in a small saucepan over medium-low heat.',
            'Stir in minced garlic and garlic powder. Set aside.',
            'Season both sides of each steak with salt and pepper.',
            'Place steaks on preheated grill and cook 4 to 5 minutes per side. An instant-read thermometer inserted into the center should read 140 degrees F (60 degrees C) for medium doneness.',
            'Transfer steaks to warmed plates; brush the tops liberally with garlic butter and allow to rest for 2 to 3 minutes before serving.',
        ]);
        expect(recipe.recipeCategories).toEqual([
            'Dinner',
        ]);
        expect(recipe.recipeCuisines).toEqual([
            'American',
        ]);
        expect(recipe.keywords).toEqual(undefined);
    });
})