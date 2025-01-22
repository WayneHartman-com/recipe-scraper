import getRecipeData from '../index'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getRecipeData', () => {
    it('should fetch and return recipe data from a valid URL', async () => {
        const url = 'https://example.com/recipes/creamy-courgette-potato-bake'
        const html = `
            <html lang="en">
                <h1>Creamy courgette & potato bake</h1>
                <script type="application/ld+json">
                    {
                        "@context": "http://schema.org",
                        "@type": "Recipe",
                        "author": "GitHub Copilot",
                        "name": "Creamy Courgette & Potato Bake",
                        "image": "https://example.com/image.jpg",
                        "description": "A delicious creamy bake",
                        "cookTime": "PT1H",
                        "prepTime": "PT30M",
                        "totalTime": "PT1H30M",
                        "recipeYield": "4 servings",
                        "recipeIngredient": ["1000g Potato", "2 Courgette"],
                        "recipeInstructions": ["Step 1", "Step 2"],
                        "recipeCategory": ["Dinner"],
                        "recipeCuisine": ["French"],
                        "keywords": ["bake", "courgette", "potato"]
                    }
                </script>
            </html>
    `;
        mockedAxios.get.mockResolvedValue({ data: html });

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.name).toBe('Creamy Courgette & Potato Bake');
        expect(recipe.author).toBe('GitHub Copilot');
        expect(recipe.image).toStrictEqual(['https://example.com/image.jpg']);
        expect(recipe.description).toBe('A delicious creamy bake');
        expect(recipe.cookTime).toBe('1 hour');
        expect(recipe.prepTime).toBe('30 minutes');
        expect(recipe.totalTime).toBe('1 hour 30 minutes');
        expect(recipe.recipeYield).toBe('4 servings');
        expect(recipe.recipeIngredients).toEqual(['1000g Potato', '2 Courgette']);
        expect(recipe.recipeInstructions).toEqual(['Step 1', 'Step 2']);
        expect(recipe.recipeCategories).toEqual(['Dinner']);
        expect(recipe.recipeCuisines).toEqual(['French']);
        expect(recipe.keywords).toEqual(['bake', 'courgette', 'potato']);
    });

    it('should throw an error if the URL is invalid', async () => {
        await expect(getRecipeData('invalid-url')).rejects.toThrow('Url must start with http:// or https://');
    });

    it('should throw no recips is found', async () => {
        const url = 'https://example.com/recipes/creamy-courgette-potato-bake'
        const html = `
            <html lang="en">
                <head>
                    <title>My Mom’s 5-Ingredient Meatloaf Is My Favorite</title>
                    <script type="application/ld+json">[{"@context":"http://schema.org","@type":["NewsArticle"],"headline":"My Mom’s 5-Ingredient Meatloaf Is My Favorite","datePublished":"2025-01-20T07:27:00.000-05:00","dateModified":"2025-01-20T07:27:00.000-05:00","author":[{"@type":"Person","name":"Ivy Manning","url":"https://www.simplyrecipes.com/ivy-manning-8722925"}],"description":"My mom’s streamlined barbecue meatloaf recipe employs just five ingredients and minimal prep without sacrificing flavor. Raid your pantry and fridge and make this super simple meatloaf tonight!","image":{"@type":"ImageObject","url":"https://www.simplyrecipes.com/thmb/em3F7IKBCNGzfsYsOT-7V45ACeg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-5-Ingredient-Meatloaf-LEAD-11-b707c075d8f74573b5dbce015288b4de.jpg","height":1000,"width":1500},"publisher":{"@type":"Organization","name":"Simply Recipes","url":"https://www.simplyrecipes.com","logo":{"@type":"ImageObject","url":"https://www.simplyrecipes.com/thmb/QvixEwCD02s_lnkgkVb6mHwKS7c=/1125x320/filters:no_upscale():max_bytes(150000):strip_icc()/SimplyRecipesLogoTransparent-07a297c54b2142ae9c079abb2f0fa639.png","width":1125,"height":320},"brand":"Simply Recipes","publishingPrinciples":"https://www.simplyrecipes.com/about-us-5096129#toc-editorial-guidelines","sameAs":["https://www.facebook.com/simplyrecipes","https://www.instagram.com/simplyrecipes","https://www.pinterest.com/simplyrecipes"]},"mainEntityOfPage":{"@type":["WebPage"],"@id":"https://www.simplyrecipes.com/barbecue-meatloaf-recipe-8775220","breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://www.simplyrecipes.com/table-talk-5206565","name":"Table Talk"}},{"@type":"ListItem","position":2,"item":{"@id":"https://www.simplyrecipes.com/voices-5206832","name":"Voices"}}]}}}]</script><title></title>                
                </head>
                <body>
                    <h1>My Mom’s 5-Ingredient Meatloaf Is My Favorite</h1>
                </body>
            </html>
        `
        mockedAxios.get.mockResolvedValue({ data: html });

        await expect(getRecipeData(url)).rejects.toThrow('Recipe not found on page');
    });
})