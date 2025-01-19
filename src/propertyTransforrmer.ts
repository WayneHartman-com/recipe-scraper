import { parse } from 'iso8601-duration'
import { MATCH_HTML_TAGS, MATCH_LINE_BREAK, MATCH_MULTI_SPACE } from './utils'

export function transformImage(value: string | Record<string, string>) {
  if (typeof value === 'string')
    return value

  if (value.url)
    return value.url

  if (Array.isArray(value))
    return value[0]

  return value
}

export function transformToList(value: string | Record<string, string>) {
  if (typeof value === 'string') {
    if (value.includes(','))
      return value.split(',').map(item => item.trim())

    return [value]
  }
  if (Array.isArray(value))
    return value

  return value
}

export function transformToString(value: string) {
  if (typeof value === 'string')
    return value

  if (Array.isArray(value)) {
    const array = value as [];
    if (array.length > 0) {
      const filtered = array.filter((item) => {
        return (typeof item === 'string');
      });
      if (filtered.length > 0) {
        return filtered[0];
      }
    }
  }

  if (typeof value === 'number') {
    return `${value}`;
  }

  return value
}

export function transformToAuthor(value: string | Record<string, string>) {
    if (!value) {
        return undefined
    }

    if (typeof value === 'string')
        return value

    if (value.name)
        return value.name

    if (Array.isArray(value)) {
        const array = value as any[];
        if (array.length > 0) {
          const first = array[0];
            if (typeof first === 'string') {
                return first;
            }

            if (first.name) {
              return first.name;
            }
        }
    } else if (typeof value === 'object') {
        if (value.name) {
          return value.name;
        }
    }

    return undefined;
}

export function transformISOToString(dateObj: Record<string, any>) {
  let date = ''

  if (dateObj.days)
    date += dateObj.days > 1 ? `${dateObj.days} days ` : `${dateObj.days} day `

  if (dateObj.hours)
    date += dateObj.hours > 1 ? `${dateObj.hours} hours ` : `${dateObj.hours} hour `

  if (dateObj.minutes)
    date += dateObj.minutes > 1 ? `${dateObj.minutes} minutes ` : `${dateObj.minutes} minute `

  if (dateObj.seconds)
    date += dateObj.seconds > 1 ? `${dateObj.seconds} seconds ` : `${dateObj.seconds} second `

  return date.trim()
}

export function transformToTime(value: string) {
  if (!value) {
    return null;
  }
  const time = transformToString(value)
  if (!time) {
    return null;
  }
  try {
    const parsedISODuration = parse(time)
    if (parsedISODuration)
      return transformISOToString(parsedISODuration)
  }
  catch { }

  return time
}

export function cleanString(str: string) {
  let cleaned = str
    .replace(MATCH_HTML_TAGS, '')
    .replace(MATCH_LINE_BREAK, ' ')
    .replace(MATCH_MULTI_SPACE, ' ')
    .trim()

  if (cleaned.startsWith(', ')) {
    cleaned = cleaned.slice(1).trim()
  }

  return cleaned
}

export function transformToCleanString(value: string) {
  return cleanString(transformToString(value))
}

export function transformInstructions(value: string | Record<string, any>) {
  if (typeof value === 'string') {
    const cleanedValue = cleanString(value)
    if (cleanedValue.includes('.,'))
      return cleanedValue.split('.,').map(item => item.trim())

    return [cleanedValue]
  }

  if (Array.isArray(value)) {
    const firstItem = value[0]
    if (typeof firstItem === 'string')
      return value.map(item => cleanString(item))

    if (typeof firstItem === 'object' && !Array.isArray(firstItem)) {
      const itemList = firstItem.itemListElement;
      if (itemList && Array.isArray(itemList)) {
        return itemList.map((item) => {
          if (item.text)
            return cleanString(item.text)

          return undefined
        })
      }
    }

    return value.map((item) => {
      if (item.text)
        return cleanString(item.text)

      return undefined
    })
  }
}

function cleanIngredientAmounts(line: string) {
  let cleaned = line
    .replace(/¼/g, '1/4')
    .replace(/½/g, '1/2')
    .replace(/¾/g, '3/4')
    .replace(/⅔/g, '2/3')
    .replace(MATCH_HTML_TAGS, '')
    .replace(MATCH_MULTI_SPACE, ' ')
    .trim()

  if (cleaned.startsWith(', ')) {
    cleaned = cleaned.slice(1).trim()
  }

  if (cleaned.startsWith('unit ')) {
    cleaned = cleaned.slice(4).trim()
  }

  return cleaned
}

export function transformIngredients(value: Record<string, any>): string[] {
  if (value && typeof value[0] === 'string')
    return value.map((item: any) => cleanIngredientAmounts(item))

  const mappedItems = [] as Array<any>

  Object.entries(value).forEach(([, item]: any) => {
    if (item.properties) {
      const { name, amount } = item.properties
      if (name || amount) {
        const _name = name && name[0]
        const _amount = amount && amount[0]
        const singleLine = _amount ? `${_amount} ${_name}` : _name
        mappedItems.push(cleanIngredientAmounts(singleLine))
      }
    }
  })
  if (mappedItems.length)
    return mappedItems

  return []
}

const propertyTransformerMap = {
  name: transformToString,
  author: transformToAuthor,
  image: transformImage,
  description: transformToCleanString,
  cookTime: transformToTime,
  prepTime: transformToTime,
  totalTime: transformToTime,
  recipeYield: transformToString,
  recipeIngredients: transformIngredients,
  recipeInstructions: transformInstructions,
  recipeCategories: transformToList,
  recipeCuisines: transformToList,
  keywords: transformToList,
}

export default propertyTransformerMap
