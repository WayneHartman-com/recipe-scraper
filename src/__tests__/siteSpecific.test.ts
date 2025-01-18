import getRecipeData from '../index'
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getRecipeData', () => {
    it('should correctly parse information from a sample recipe from HelloFresh.com', async () => {
        const url = 'https://example.com/recipes/creamy-courgette-potato-bake'
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
})