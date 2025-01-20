import getRecipeData from '../index'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('transformISOToString', () => {
    it('should cover code paths not covered for transformISOToString', async () => {
        const url = 'https://www.hellofresh.com/recipes/mozzarella-crusted-chicken-5845b27b2e69d7646110f1c2'

        const html = `
            <html lang="en">
                <head>
                    <title>Test</title>
                </head>
                <body>
                    <script type="application/ld+json" id="schema-org">
                        {
                            "@context": "http://schema.org/",
                            "@type": "Recipe",
                            "name": "Mozzarella-Crusted Chicken with Blistered Tomatoes and Potato Wedges",
                            "author": "HelloFresh",
                            "image": "https://img.hellofresh.com/f_auto,fl_lossy,h_640,q_auto,w_1200/hellofresh_s3/image/de-mozzarella-crusted-chicken-w0-4336bddd.jpg",
                            "thumbnailUrl": "https://img.hellofresh.com/f_auto,fl_lossy,h_300,q_auto,w_450/hellofresh_s3/image/de-mozzarella-crusted-chicken-w0-4336bddd.jpg",
                            "description": "Think of this recipe as a new take on chicken Parmesan. Herbs, breadcrumbs, and mozzarella are heaped onto chicken to create glorious crown of a crust. In place of marinara, roasted tomatoes add a sweet and tangy punch. On the side, you’ve also got some crispy potatoes because, hey, why not?",
                            "datePublished": "2016-12-05T18:31:23+00:00",
                            "totalTime": "P1DT2H30M20S",
                            "nutrition": {
                                "@type": "NutritionInformation",
                                "calories": "545 kcal",
                                "fatContent": "17 g",
                                "saturatedFatContent": "5 g",
                                "carbohydrateContent": "46 g",
                                "sugarContent": "6 g",
                                "proteinContent": "52 g",
                                "fiberContent": "7 g",
                                "cholesterolContent": "114 mg",
                                "sodiumContent": "355 mg",
                                "servingSize": null
                            },
                            "recipeInstructions": [
                                {
                                    "@type": "HowToStep",
                                    "text": "Wash and dry all produce. Preheat oven to 425 degrees. Cut potatoes into ½-inch-thick wedges, like steak fries. Core and quarter tomatoes."
                                },
                                {
                                    "@type": "HowToStep",
                                    "text": "Toss potatoes on one side of a foil-lined baking sheet with a drizzle of olive oil and a pinch of salt and pepper. On other side of baking sheet, toss tomatoes with a drizzle of olive oil and a pinch of salt and pepper. Roast until potatoes are crispy and tomatoes are very soft, 25-30 minutes, tossing halfway through."
                                },
                                {
                                    "@type": "HowToStep",
                                    "text": "Mix panko, oregano, paprika, mozzarella, a drizzle of olive oil, and a pinch of salt and pepper in a small bowl."
                                },
                                {
                                    "@type": "HowToStep",
                                    "text": "Season chicken breasts all over with salt and pepper. Rub with a drizzle of olive oil. Place on a second baking sheet."
                                },
                                {
                                    "@type": "HowToStep",
                                    "text": "Add a layer of panko crust to top of each chicken breast, gently pressing to adhere. Pile topping as high as possible (you may have some left over)."
                                },
                                {
                                    "@type": "HowToStep",
                                    "text": "Bake chicken until meat is cooked through and topping is golden brown, about 20 minutes. Serve with potato wedges and roasted tomatoes."
                                }
                            ],
                            "recipeIngredient": [
                                "12 ounce Chicken Breasts",
                                "½ cup Mozzarella Cheese",
                                "2 unit Roma Tomato",
                                "½ cup Panko Breadcrumbs",
                                "1 teaspoon Paprika",
                                "12 ounce Yukon Gold Potatoes",
                                "1 teaspoon Dried Oregano",
                                "4 teaspoon Olive Oil",
                                "unit Salt",
                                "unit Pepper"
                            ],
                            "recipeYield": 2,
                            "keywords": [
                                "SEO"
                            ],
                            "recipeCategory": "main course",
                            "recipeCuisine": "North America"
                        }
                    </script>                
                </body>
            </html>
        `;
        mockedAxios.get.mockResolvedValue({ data: html })

        const recipe = await getRecipeData(url);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        expect(recipe.totalTime).toBe('1 day 2 hours 30 minutes 20 seconds');
    });
})