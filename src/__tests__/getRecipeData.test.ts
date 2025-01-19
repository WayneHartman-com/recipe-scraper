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
})