export interface Options {
  maxRedirects?: number
  lang?: string
  timeout?: number
  html?: string
  url?: string
}

export interface IRecipe {
  url: string
  name: string
  image: string
  description: string
  cookTime: string|undefined
  prepTime: string|undefined
  totalTime: string|undefined
  recipeYield: string|undefined
  recipeIngredients: string[]
  recipeInstructions: string[]
  recipeCategories: string[]
  recipeCuisines: string[]
  keywords: string[]
}
