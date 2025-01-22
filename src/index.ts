import type { AxiosResponse } from 'axios'
import * as cheerio from 'cheerio'
import axios from 'axios'
import { validate } from 'jsonschema'

// @ts-expect-error - ...
import microdata from 'microdata-node'
import type { Recipe, WithContext } from 'schema-dts'
import schema from './schema.json'
import type { IRecipe, Options } from './types'
import { isValidHttpUrl } from './utils'
import propertyTransformerMap from './propertyTransforrmer'

interface WithGraph extends WithContext<Recipe> {
  '@graph': Recipe[]
}

const DEFAULT_OPTIONS = {
  maxRedirects: 5,
  timeout: 10000,
  lang: 'en-US,en;q=0.9',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
}

function consolidateRecipeProperties(recipe: Record<string, any>): IRecipe {
  return {
    url: recipe.url,
    author: recipe.author,
    name: recipe.name,
    image: recipe.image || recipe.thumbnailUrl,
    description: recipe.description,
    cookTime: recipe.cookTime,
    prepTime: recipe.prepTime,
    totalTime: recipe.totalTime,
    recipeYield: recipe.recipeYield,
    recipeIngredients: recipe.recipeIngredient,
    recipeInstructions: recipe.recipeInstructions,
    recipeCategories: recipe.recipeCategory,
    recipeCuisines: recipe.recipeCuisine,
    keywords: recipe.keywords,
  }
}

export interface ConsilidatedRecipe extends ReturnType<typeof consolidateRecipeProperties> {}

function prettifyRecipe(recipe: Recipe, url: string) {
  const transformedRecipe: Record<string, any> = {}
  const consolidatedRecipe = consolidateRecipeProperties(recipe)

  transformedRecipe.url = recipe.url?.toString() || (isValidHttpUrl(url) ? url : undefined)

  Object.entries(consolidatedRecipe).forEach(([key, value]) => {
    const propertyTransformer = propertyTransformerMap[key as keyof typeof propertyTransformerMap]
    if (value && propertyTransformer)
      transformedRecipe[key] = propertyTransformer(value)
  })

  return transformedRecipe as ConsilidatedRecipe
}

export default async function getRecipeData(input: string | Partial<Options>, inputOptions: Partial<Options> = {}) {
  let siteUrl: string, html: string, recipe: unknown

  if (typeof input === 'object') {
    inputOptions = input
    siteUrl = input as string
  }
  else { siteUrl = input }

  const options = { ...DEFAULT_OPTIONS, ...inputOptions }

  if (!isValidHttpUrl(siteUrl) && !options.html)
    throw new Error('Url must start with http:// or https://')

  try {
    const response: AxiosResponse<string> = await axios.get(siteUrl, {
      responseType: 'text',
      headers: {
        'User-Agent': options.userAgent,
        'Accept-Language': options.lang,
        'Accept-Encoding': 'gzip, deflate, br',
      },
      timeout: options.timeout,
      maxRedirects: options.maxRedirects,
    })
    html = response.data
  }
  catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'

    if (options.html)
      html = options.html as string

    else
      throw new Error(message)
  }

  try {
    const $ = cheerio.load(html)
    const tags = $('script[type="application/ld+json"]')
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        const textContent = $(tag).text()
        if (textContent) {
          const data: WithGraph = JSON.parse(textContent)

          if (data['@graph'] && Array.isArray(data['@graph'])) {
            data['@graph'].forEach((g) => {
              if (g['@type'] === 'Recipe') {
                recipe = g
              }
            })
          }

          if (data['@type'] === 'Recipe')
            recipe = data

          if (Array.isArray(data['@type']) && data['@type'].includes('Recipe'))
            recipe = data

          if (Array.isArray(data))
            recipe = data.find(obj => obj['@type'] && obj['@type'].includes('Recipe'))
        }
        else {
          throw new Error('Something went wrong while scraping')
        }
      }
    }
    else {
      throw new Error('Trying search for microdata next')
    }
  }
  catch {
    const data = microdata.toJson(html)
    if (!data || !data.items || !data.items[0])
      throw new Error('HTML tags provided has no valid recipe schema')

    const recipeData = Object.values(data.items).find((item: any) => item.type[0].includes('Recipe')) as Record<string, any>
    if (!recipeData?.properties)
      throw new Error('Recipe not found on page')

    recipe = recipeData.properties
  }

  if (!recipe) {
    throw new Error('Recipe not found on page');
  }

  const prettifiedRecipe = prettifyRecipe(recipe as Recipe, siteUrl)
  if (prettifiedRecipe !== undefined) {
    const response = validate({ name: prettifiedRecipe.name, recipeIngredients: prettifiedRecipe.recipeIngredients }, schema)
    if (!response.valid)
      throw new Error('Recipe is not valid')

    return prettifiedRecipe
  }
}
