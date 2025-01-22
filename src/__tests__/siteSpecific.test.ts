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
        expect(recipe.author).toBe('HelloFresh');
        expect(recipe.image).toStrictEqual(['https://img.hellofresh.com/f_auto,fl_lossy,h_640,q_auto,w_1200/hellofresh_s3/image/de-mozzarella-crusted-chicken-w0-4336bddd.jpg']);
        expect(recipe.description).toBe('Think of this recipe as a new take on chicken Parmesan. Herbs, breadcrumbs, and mozzarella are heaped onto chicken to create glorious crown of a crust. In place of marinara, roasted tomatoes add a sweet and tangy punch. On the side, you’ve also got some crispy potatoes because, hey, why not?');
        expect(recipe.cookTime).toBe(undefined);
        expect(recipe.prepTime).toBe(undefined);
        expect(recipe.totalTime).toBe('30 minutes');
        expect(recipe.recipeYield).toBe('2');
        expect(recipe.recipeIngredients).toEqual([
            "12 ounce Chicken Breasts",
            "1/2 cup Mozzarella Cheese",
            "2 unit Roma Tomato",
            "1/2 cup Panko Breadcrumbs",
            "1 teaspoon Paprika",
            "12 ounce Yukon Gold Potatoes",
            "1 teaspoon Dried Oregano",
            "4 teaspoon Olive Oil",
            "Salt",
            "Pepper",
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
        expect(recipe.author).toBe('America\'s Test Kitchen');
        expect(recipe.image).toStrictEqual(['https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_150/25851_sfs-best-prime-rib-21']);
        expect(recipe.description).toBe('Top chefs say 18 hours in a 120-degree oven is the route to prime rib perfection. What if we told you it was possible in almost one-third the time? The perfect prime rib should have a deep-colored, substantial crust encasing a tender, juicy rosy-pink center. To achieve this perfect roast, we started by salting the roast overnight. The salt enhanced the beefy flavor while dissolving some of the proteins, yielding a buttery-tender roast. To further enhance tenderness, we cooked the roast at a very low temperature, which allowed the meat\'s enzymes to act as natural tenderizers, breaking down its tough connective tissue. A brief stint under the broiler before serving ensured a crisp, flavorful crust.');
        expect(recipe.cookTime).toBe(undefined);
        expect(recipe.prepTime).toBe(undefined);
        expect(recipe.totalTime).toBe(undefined);
        expect(recipe.recipeYield).toBe('Serves 6 to 8');
        expect(recipe.recipeIngredients).toEqual([
            '1 (7-pound), first-cut beef standing rib roast (3 bones), meat removed from bones, bones reserved',
            'Kosher salt and ground black pepper',
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
        const url = 'https://www.allrecipes.com/recipe/236990/chef-johns-barbecue-chicken/'
        const htmlFilePath = path.resolve(__dirname, 'html/all-recipes.html')
        const html = fs.readFileSync(htmlFilePath, 'utf-8')
        mockedAxios.get.mockResolvedValue({ data: html })

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.name).toBe('Chef John\'s Barbecue Chicken');
        expect(recipe.author).toBe('John Mitzewich');
        expect(recipe.image).toStrictEqual(['https://www.allrecipes.com/thmb/qjBKo6LtXTJFArnpJNPUgrvCYyw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/236990-Chef-John-Barbecue-Chicken-ddmfs-4x3-2856-261a22bfd2154315ba2f0fc4c6f86953.jpg']);
        expect(recipe.description).toBe('Chef John\'s grilled barbecue chicken is perfect every time. Say goodbye to a burned BBQ coating and hello to a thick, sticky glaze that permeates the meat.');
        expect(recipe.cookTime).toBe('40 minutes');
        expect(recipe.prepTime).toBe('20 minutes');
        expect(recipe.totalTime).toBe('120 minutes');
        expect(recipe.recipeYield).toBe('6');
        expect(recipe.recipeIngredients).toEqual([
            "1 whole chicken, cut into halves",
            "0.25 cup rice vinegar",
            "2 tablespoons barbecue sauce",
            "2 cloves garlic, crushed",
            "1 tablespoon salt",
            "1 teaspoon ground black pepper",
            "1 teaspoon paprika",
            "1 teaspoon onion powder",
            "0.5 teaspoon cayenne pepper",
            "0.5 cup barbecue sauce, or as needed",
        ]);
        expect(recipe.recipeInstructions).toEqual([
            "Cut 1/2-inch deep slashes in the skin-side of each chicken half: two cuts in each breast, two in each thigh, and one in each leg. Remove wing tips.",
            "Whisk vinegar, 2 tablespoons barbecue sauce, and garlic together in a large bowl. Place chicken in the bowl and turn to coat. Arrange chicken halves in the bottom of the bowl with the cut sides down; cover with plastic wrap and refrigerate for 1 hour.",
            "Preheat an outdoor grill for medium-high heat and lightly oil the grate.",
            "Remove chicken from the bowl and pat dry with paper towels; discard any remaining marinade. Place chicken halves, skin-side up, on a plate and season with salt, pepper, paprika, onion powder, and cayenne pepper.",
            "Cook chicken, skin-side down, on the preheated grill until grill marks appear, 3 to 4 minutes. Turn chicken over, close the grill lid, and cook, basting with remaining barbecue sauce every 6 minutes, until no longer pink at the bone and the juices run clear, about 35 minutes. An instant-read thermometer inserted into the thickest part of the thigh, near the bone should read 165 degrees F (74 degrees C).",
        ]);
        expect(recipe.recipeCategories).toEqual([
            'Dinner',
        ]);
        expect(recipe.recipeCuisines).toEqual([
            'American',
        ]);
        expect(recipe.keywords).toEqual(undefined);
    });

    it('should correctly parse information from a sample recipe from thecookierookie.com', async () => {
        const url = 'https://www.thecookierookie.com/chicken-tacos/#wprm-recipe-container-30303'
        const htmlFilePath = path.resolve(__dirname, 'html/the-cookie-rookie.html')
        const html = fs.readFileSync(htmlFilePath, 'utf-8')
        mockedAxios.get.mockResolvedValue({ data: html })

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.name).toBe('Baked Chicken Tacos Recipe');
        expect(recipe.author).toBe(undefined);
        expect(recipe.image).toStrictEqual([
            "https://www.thecookierookie.com/wp-content/uploads/2023/04/chicken-tacos-featured.jpg",
            "https://www.thecookierookie.com/wp-content/uploads/2023/04/chicken-tacos-featured-500x500.jpg",
            "https://www.thecookierookie.com/wp-content/uploads/2023/04/chicken-tacos-featured-500x375.jpg",
            "https://www.thecookierookie.com/wp-content/uploads/2023/04/chicken-tacos-featured-480x270.jpg",
        ]);
        expect(recipe.description).toBe('How to make the best baked chicken tacos for a crowd! Lots of tacos made in one baking dish for family dinners, Cinco de Mayo, and more.Step-by-step photos can be seen below the recipe card.');
        expect(recipe.cookTime).toBe('10 minutes');
        expect(recipe.prepTime).toBe('15 minutes');
        expect(recipe.totalTime).toBe('25 minutes');
        expect(recipe.recipeYield).toBe('10');
        expect(recipe.recipeIngredients).toEqual([
            "1 tablespoon olive oil",
            "1/2 pound shredded cooked chicken (We used Rotisserie chicken)",
            "1 ounce taco seasoning ((click for recipe!))",
            "1/2 cup diced onion",
            "14.5 ounces diced tomatoes (fully drained (1 can))",
            "4.5 ounces diced green chiles (fully drained (1 can))",
            "10 hard taco shells (We used Old El Paso Stand &#39;N Stuff)",
            "8 ounces refried beans ((1/2 can))",
            "2 cups shredded Mexican blend cheese",
            "Sliced jalapeños",
            "Sour cream",
            "Salsa",
            "Shredded lettuce",
            "Chopped fresh cilantro",
        ]);
        expect(recipe.recipeInstructions).toEqual([
            "Preheat oven to 400°F. Spray a 9x13-inch baking dish with nonstick spray.",
            "Heat the olive oil over medium heat in a medium skillet.",
            "Add onion to skillet and cook for 2-3 minutes, or until the onion is translucent and fragrant.",
            "Stir in the chicken, taco seasoning, tomatoes (fully drained), and green chiles (fully drained). Stir to combine fully. Reduce to simmer and allow to cook for 5-8 minutes.",
            "Place the taco shells in the baking dish, standing up. We were able to fit 10 taco shells in the dish by adding 2 on each side.",
            "Bake the taco shells for 5 minutes by themselves to allow them to crisp up. Remove from the oven.",
            "Spoon 1 tablespoon of beans into the bottom of each taco shell. Top with the chicken mixture, almost to the top of each shell.",
            "Sprinkle each shell generously with shredded cheese, the more the better!",
            "Bake for 7-10 minutes, or until cheese is fully melted and the edges of the shells are browned.",
            "Remove from the oven and top with your favorite items such as jalapenos, sour cream, shredded lettuce, cilantro, and salsa.",
        ]);
        expect(recipe.recipeCategories).toEqual([
            'Main Course'
        ]);
        expect(recipe.recipeCuisines).toEqual([
            'Mexican'
        ]);
        expect(recipe.keywords).toEqual([
            'baked tacos',
            'chicken tacos'
        ]);
    });

    it('should correctly parse information from a sample recipe from tamingtwins.com', async () => {
        const url = 'https://www.tamingtwins.com/homemade-potato-wedges/'
        const htmlFilePath = path.resolve(__dirname, 'html/taming-twins.html')
        const html = fs.readFileSync(htmlFilePath, 'utf-8')
        mockedAxios.get.mockResolvedValue({ data: html })

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.name).toBe('Easiest Ever Potato Wedges {Air Fryer or Oven}');
        expect(recipe.author).toBe(undefined);
        expect(recipe.image).toStrictEqual([
            "https://www.tamingtwins.com/wp-content/uploads/2024/07/potato-wedges-10.jpg",
            "https://www.tamingtwins.com/wp-content/uploads/2024/07/potato-wedges-10-500x500.jpg",
            "https://www.tamingtwins.com/wp-content/uploads/2024/07/potato-wedges-10-500x375.jpg",
            "https://www.tamingtwins.com/wp-content/uploads/2024/07/potato-wedges-10-480x270.jpg",
        ]);
        expect(recipe.description).toBe('These homemade Potato Wedges can be made in the air fryer or oven with ease. They’re fresh, flavour-packed and so easy to do. Follow a few simple tips and tricks to get the VERY best family favourite side dish.');
        expect(recipe.cookTime).toBe('25 minutes');
        expect(recipe.prepTime).toBe(undefined);
        expect(recipe.totalTime).toBe('25 minutes');
        expect(recipe.recipeYield).toBe('4');
        expect(recipe.recipeIngredients).toEqual([
            "400 g Potatoes (Unpeeled)",
            "1 tsp Garlic granules",
            "1 tsp Sweet smoked paprika (Optional)",
            "1 tbsp Olive oil",
            "Sea salt and freshly ground black pepper",
        ]);
        expect(recipe.recipeInstructions).toStrictEqual([
            "Cut the potatoes in half lengthways, then in quarters and then keep cutting in half again until you have evenly shaped and thickness of wedges (1 cm thickness). (Or use an apple divider!)",
            "Dry off the wedges with a clean kitchen towel and then place into a large bowl.",
            "Add the rest of the ingredients and mix really well.",
        ]);
        expect(recipe.recipeCategories).toEqual([
            'Side Dish'
        ]);
        expect(recipe.recipeCuisines).toEqual([
            'Family Food'
        ]);
        expect(recipe.keywords).toEqual([
            'potato wedges',
        ]);
    });

    it('should correctly parse information from a sample recipe from delish.com', async () => {
        const url = 'https://www.delish.com/cooking/recipe-ideas/a63349745/sweet-and-sour-tofu-recipe/'
        const htmlFilePath = path.resolve(__dirname, 'html/delish.html')
        const html = fs.readFileSync(htmlFilePath, 'utf-8')
        mockedAxios.get.mockResolvedValue({ data: html })

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.name).toBe('Sweet & Sour Tofu');
        expect(recipe.author).toBe("Gabby Romero");
        expect(recipe.image).toStrictEqual([
            "https://hips.hearstapps.com/hmg-prod/images/del129924-sweet-sour-tofu-web-5004-rl-index-676045c11d068.jpg?crop=0.502xw:1.00xh;0.229xw,0&resize=1200:*",
            "https://hips.hearstapps.com/hmg-prod/images/del129924-sweet-sour-tofu-web-5004-rl-index-676045c11d068.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
            "https://hips.hearstapps.com/hmg-prod/images/del129924-sweet-sour-tofu-web-5004-rl-index-676045c11d068.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
        ]);
        expect(recipe.description).toBe('The combination of savory, tangy, and sweet flavors pairs perfectly with tofu in this easy vegetarian dinner.');
        expect(recipe.cookTime).toBe(undefined);
        expect(recipe.prepTime).toBe('15 minutes');
        expect(recipe.totalTime).toBe('1 hour 15 minutes');
        expect(recipe.recipeYield).toBe('4 serving(s)');
        expect(recipe.recipeIngredients).toEqual([
            "14 oz. extra-firm tofu",
            "1 small red onion",
            "1 green bell pepper",
            "1 red bell pepper",
            "1 (1\") piece ginger, peeled",
            "2 garlic cloves, peeled",
            "1/2 c. canned pineapple chunks, plus 1/3 cup pineapple juice, divided",
            "1/3 c. low-sodium vegetable broth",
            "3 tbsp. unseasoned rice vinegar",
            "2 tbsp. reduced-sodium soy sauce or tamari",
            "1 tbsp. ketchup",
            "1 tbsp. light brown sugar",
            "1 tbsp. plus 1/3 cup cornstarch, divided",
            "4 tbsp. neutral oil, divided",
            "Kosher salt",
            "Steamed white rice, for serving",
            "Sesame seeds, for serving (optional)",
        ]);
        expect(recipe.recipeInstructions).toStrictEqual([
            "Place 3 layers of paper towels or a clean kitchen towel on a plate. Place tofu on towels and cover with another 3 layers of towels or another clean kitchen towel. Place a heavy can or skillet on top of tofu to press moisture out, pouring off excess water and replacing towels as they get soaked, 30 to 45 minutes (you can do this with a tofu press if you have one).",
            "Meanwhile, arrange a rack in center of oven; preheat to 425°. Cut onion and bell peppers into 1\" pieces. Into a medium bowl or large measuring cup, grate ginger and garlic. Add pineapple juice, broth, vinegar, soy sauce, ketchup, brown sugar, and 1 Tbsp. cornstarch and stir to combine.",
            "Break tofu into rough 1\" pieces and transfer to a large bowl; season with 1 tsp. salt. Drizzle with 1 Tbsp. oil and gently toss tofu to coat. Sprinkle with remaining 1/3 cup cornstarch and gently toss until tofu is coated. Arrange on a parchment-lined baking sheet and drizzle with 2 Tbsp. oil.",
            "Bake tofu, turning halfway through, until light brown and crisp, 25 to 30 minutes.",
            "When tofu has about 12 minutes remaining, in a large skillet or wok over medium-high heat, heat remaining 1 Tbsp. oil. Add onion and bell peppers; season with salt, then toss to coat vegetables with oil. Cook, stirring frequently, until vegetables start to soften and blister on the surface, 4 to 5 minutes. Transfer vegetables to a plate.",
            "Reduce heat to medium. Whisk sauce to reincorporate cornstarch and pour into skillet. Bring to a simmer and cook, stirring occasionally, until slightly thickened, about 4 minutes. Add vegetables, tofu, and pineapple chunks to skillet and toss to coat in sauce.",
            "Divide rice among bowls. Spoon tofu mixture over. Top with sesame seeds (if using).",
        ]);
        expect(recipe.recipeCategories).toEqual([
            "dairy-free",
            "gluten-free",
            "vegan",
            "vegetarian",
            "dinner",
            "main dish",
        ]);
        expect(recipe.recipeCuisines).toEqual([
            "American",
            "Asian",
        ]);
        expect(recipe.keywords).toEqual([
            "content-type: Recipe",
            "locale: US",
            "displayType: recipe",
            "American, Asian, dairy-free, dinner, gluten-free, main dish, vegan, vegetarian",
            "NUTRITION: dairy-free",
            "NUTRITION: gluten-free",
            "NUTRITION: vegan",
            "NUTRITION: vegetarian",
            "CATEGORY: dinner",
            "CATEGORY: main dish",
            "TOTALTIME: 01:15:00",
            "FILTERTIME: >1HR",
        ]);
    });
})

