import getRecipeData from '../index'

describe('getRecipeData', () => {
    it('should fetch and return recipe data from a valid URL', async () => {
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
});