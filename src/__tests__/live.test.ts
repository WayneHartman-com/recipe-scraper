import getRecipeData from '../index'

describe('getRecipeData', () => {
    it('should fetch and return recipe data from the food network', async () => {
        const url = 'https://www.foodnetwork.com/recipes/food-network-kitchen/penne-with-vodka-sauce-and-mini-meatballs-3364941';

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.name).toBe('Penne with Vodka Sauce and Mini Meatballs');
        expect(recipe.author).toBe('Food Network Kitchen');
        expect(recipe.image).toStrictEqual([
            "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1465939620872.webp",
            "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1465939620872.webp",
            "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1465939620872.webp",
        ]);
        expect(recipe.description).toBe(undefined);
        expect(recipe.cookTime).toBe('25 minutes');
        expect(recipe.prepTime).toBe('10 minutes');
        expect(recipe.totalTime).toBe('35 minutes');
        expect(recipe.recipeYield).toBe('4 servings');
        expect(recipe.recipeIngredients).toEqual([
            "Kosher salt",
            "12 ounces penne pasta",
            "8 ounces ground beef chuck",
            "3/4 cup grated parmesan cheese (about 1 1/2 ounces)",
            "1/4 cup breadcrumbs",
            "1 large egg, lightly beaten",
            "3/4 cup chopped fresh basil",
            "3 cloves garlic (1 minced, 2 sliced)",
            "2 1/2 pounds beefsteak tomatoes, halved",
            "2 tablespoons extra-virgin olive oil",
            "1/4 cup vodka",
            "1/4 cup heavy cream",
            "Freshly ground pepper",
        ]);
        expect(recipe.recipeInstructions).toEqual([
            "Bring a large pot of salted water to a boil. Add the pasta and cook as the label directs. Reserve 1/2 cup cooking water, then drain.",
            "Meanwhile, mix the beef, 1/4 cup parmesan, the breadcrumbs, egg, 1/2 cup basil, the minced garlic and 1/2 teaspoon salt in a large bowl with your hands until just combined. Form into 3/4-inch meatballs (about 20). Grate the tomatoes into a medium bowl; discard the skins.",
            "Heat a large nonstick skillet over medium heat. Add the olive oil, then the meatballs. Cook, turning, until browned on all sides, 2 to 3 minutes. Add the sliced garlic and cook until just golden, about 1 minute. Gradually add the vodka, then the grated tomatoes and cream. Bring to a simmer and cook until the sauce thickens and the meatballs are cooked through, 8 to 10 minutes. Season with 1/2 teaspoon salt and a few grinds of pepper.",
            "Add the pasta and the remaining 1/4 cup basil to the skillet; toss, adding the reserved cooking water as needed to loosen. Remove from the heat and add the remaining 1/2 cup parmesan; toss.",
        ]);
        expect(recipe.recipeCategories).toEqual(undefined);
        expect(recipe.recipeCuisines).toEqual(undefined);
        expect(recipe.keywords).toEqual([
            "Healthy",
            "Pasta Recipes",
            "Penne Recipes",
            "High Fiber",
        ]);
    });

    it('should fetch and return recipe data from Andy Cooks', async () => {
        const url = 'https://www.andy-cooks.com/blogs/recipes/buffalo-chicken-burger?_pos=1&_psq=chicken+sand&_ss=e&_v=1.0';

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.name).toBe('Buffalo chicken burger');
        expect(recipe.author).toBe('Andy');
        expect(recipe.image).toStrictEqual([]);
        expect(recipe.description).toBe('Crispy fried chicken thighs coated in a spicy buffalo sauce, topped with creamy ranch dressing, dill pickles, and lettuce, all nestled in a toasted milk bun.');
        expect(recipe.cookTime).toBe('30 minutes');
        expect(recipe.prepTime).toBe('2 hours');
        expect(recipe.totalTime).toBe('2 hours 30 minutes');
        expect(recipe.recipeYield).toBe('6');
        expect(recipe.recipeIngredients).toEqual([
            "600ml (20 fl oz) buttermilk",
            "350ml (12 fl oz) vinegar-style hot sauce",
            "2 tsp chilli powder",
            "3 tbsp garlic powder",
            "2 tbsp onion powder",
            "1/2 tsp MSG (optional)",
            "1/2 tsp salt",
            "6 large chicken thighs, boneless and skinless",
            "small bunch of chives, finely sliced",
            "100g (31/2 oz) mayonnaise",
            "100g (31/2 oz) sour cream",
            "zest of 1 lemon",
            "150g (5 oz) butter",
            "60ml (2 fl oz) honey",
            "20ml (3/4 fl oz) vinegar",
            "200g (7 oz) rice flour",
            "200g (7 oz) plain flour",
            "oil for frying",
            "6 milk buns",
            "1 head butter lettuce, washed",
            "dill pickles, sliced",
        ]);
        expect(recipe.recipeInstructions).toEqual([
            "In a large bowl, combine 600ml buttermilk, 50ml vinegar-style hot sauce, 1 teaspoon chilli powder, 1 tablespoon garlic powder, 1 tablespoon onion powder, ½ teaspoon MSG, and ½ teaspoon salt. Mix well.",
            "Trim excess fat from the chicken thighs and butterfly any thick pieces for even cooking.",
            "Add the chicken thighs to the marinade, ensuring they are well coated. Cover and refrigerate for 2–6 hours.",
            "To make the ranch dressing, in a small bowl mix together the sour cream, 50ml buttermilk, mayonnaise, chives, lemon zest, and a pinch of salt. Set aside.",
            "To make the buffalo sauce, in a saucepan combine 300ml vinegar-style hot sauce, 100g butter, 60ml honey, 20ml vinegar, and 1 tablespoon garlic powder.",
            "Heat over medium, stirring until the butter melts and the mixture is smooth and emulsified. Remove from heat and set aside.",
            "To make the dredge, in a large bowl mix the rice flour, plain flour, 1 teaspoon chilli powder, 1 tablespoon garlic powder, 1 tablespoon onion powder, and a generous pinch of salt.",
            "Heat oil in a deep fryer or heavy-bottomed pan to 180°C (350°F).",
            "Remove the chicken thighs from the marinade. Add 2–3 spoonfuls of the marinade to the flour mixture and mix to create crispy bits.",
            "Coat each piece of chicken thoroughly in the flour mixture, pressing to ensure even coverage.",
            "Fry the chicken in batches for 10–12 minutes, or until golden brown and the internal temperature reaches at least 70°C (160°F). Transfer to a wire rack to rest.",
            "Toast the milk buns in a pan with butter until golden.",
            "Spread ranch dressing on the bottom bun and top with a layer of butter lettuce.",
            "Dip the fried chicken in the buffalo sauce, allowing excess to drip off, and place on the lettuce.",
            "Add sliced dill pickles and another dollop of ranch dressing, then top with the other half of the bun.",
            "Serve immediately and enjoy!",
        ]);
        expect(recipe.recipeCategories).toEqual(["&lt;p&gt;Lunch&lt;/p&gt;"]);
        expect(recipe.recipeCuisines).toEqual(['American']);
        expect(recipe.keywords).toEqual( ['Lunch', 'Burgers and sandwiches', 'Chicken']);
    });

    it('should fetch and return recipe data from Simply Recipes', async () => {
        const url = 'https://www.simplyrecipes.com/barbecue-meatloaf-recipe-8775220';

        let error;

        try {
            await getRecipeData(url);
        } catch (err) {
            // @ts-ignore
            error = err.message;
        }

        expect(error).toBe('Recipe not found on page');
    });
});