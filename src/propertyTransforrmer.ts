import { parse } from 'iso8601-duration'
import { MATCH_HTML_TAGS, MATCH_LINE_BREAK, MATCH_MULTI_SPACE } from './utils'

const htmlCodes = {"&#9;":"\t","&#10;":"\n","&#32;":" ","&#33;":"!","&#35;":"#","&#36;":"$","&#37;":"%","&#38;":"&","&#39;":"'","&#40;":"(","&#41;":")","&#42;":"*","&#43;":"+","&#44;":",","&#45;":"-","&#46;":".","&#47;":"/","&#58;":":","&#59;":";","&#60;":"<","&#61;":"=","&#62;":">","&#63;":"?","&#64;":"@","&#91;":"[","&#92;":"\\","&#93;":"]","&#94;":"^","&#95;":"_","&#96;":"`","&#123;":"{","&#124;":"|","&#125;":"}","&#126;":"~","&#128;":"€","&#130;":"‚","&#131;":"ƒ","&#132;":"„","&#133;":"…","&#134;":"†","&#135;":"‡","&#136;":"ˆ","&#137;":"‰","&#138;":"Š","&#139;":"‹","&#140;":"Œ","&#142;":"Ž","&#145;":"‘","&#146;":"’","&#147;":"“","&#148;":"”","&#149;":"•","&#150;":"–","&#151;":"—","&#152;":"˜","&#153;":"™","&#154;":"š","&#155;":"›","&#156;":"œ","&#158;":"ž","&#159;":"Ÿ","&#160;":" ","&#161;":"¡","&#162;":"¢","&#163;":"£","&#164;":"¤","&#165;":"¥","&#166;":"¦","&#167;":"§","&#168;":"¨","&#169;":"©","&#170;":"ª","&#171;":"«","&#172;":"¬","&#173;":"-","&#174;":"®","&#175;":"¯","&#176;":"°","&#177;":"±","&#178;":"²","&#179;":"³","&#180;":"´","&#181;":"µ","&#182;":"¶","&#183;":"·","&#184;":"¸","&#185;":"¹","&#186;":"º","&#187;":"»","&#188;":"¼","&#189;":"½","&#190;":"¾","&#191;":"¿","&#192;":"À","&#193;":"Á","&#194;":"Â","&#195;":"Ã","&#196;":"Ä","&#197;":"Å","&#198;":"Æ","&#199;":"Ç","&#200;":"È","&#201;":"É","&#202;":"Ê","&#203;":"Ë","&#204;":"Ì","&#205;":"Í","&#206;":"Î","&#207;":"Ï","&#208;":"Ð","&#209;":"Ñ","&#210;":"Ò","&#211;":"Ó","&#212;":"Ô","&#213;":"Õ","&#214;":"Ö","&#215;":"×","&#216;":"Ø","&#217;":"Ù","&#218;":"Ú","&#219;":"Û","&#220;":"Ü","&#221;":"Ý","&#222;":"Þ","&#223;":"ß","&#224;":"à","&#225;":"á","&#226;":"â","&#227;":"ã","&#228;":"ä","&#229;":"å","&#230;":"æ","&#231;":"ç","&#232;":"è","&#233;":"é","&#234;":"ê","&#235;":"ë","&#236;":"ì","&#237;":"í","&#238;":"î","&#239;":"ï","&#240;":"ð","&#241;":"ñ","&#242;":"ò","&#243;":"ó","&#244;":"ô","&#245;":"õ","&#246;":"ö","&#247;":"÷","&#248;":"ø","&#249;":"ù","&#250;":"ú","&#251;":"û","&#252;":"ü","&#253;":"ý","&#254;":"þ","&#255;":"ÿ","&#8364;":"€","&#8482;":"™","&#8592;":"←","&#8593;":"↑","&#8594;":"→","&#8595;":"↓","&#8596;":"↔","&#8629;":"↵","&#8704;":"∀","&#8706;":"∂","&#8707;":"∃","&#8709;":"∅","&#8711;":"∇","&#8712;":"∈","&#8713;":"∉","&#8715;":"∋","&#8719;":"∏","&#8721;":"∑","&#8722;":"−","&#8727;":"∗","&#8730;":"√","&#8733;":"∝","&#8734;":"∞","&#8736;":"∠","&#8743;":"∧","&#8744;":"∨","&#8745;":"∩","&#8746;":"∪","&#8747;":"∫","&#8756;":"∴","&#8764;":"∼","&#8773;":"≅","&#8776;":"≈","&#8800;":"≠","&#8801;":"≡","&#8804;":"≤","&#8805;":"≥","&#8834;":"⊂","&#8835;":"⊃","&#8836;":"⊄","&#8838;":"⊆","&#8839;":"⊇","&#8853;":"⊕","&#8855;":"⊗","&#8869;":"⊥","&#8901;":"⋅","&#8968;":"⌈","&#8969;":"⌉","&#8970;":"⌊","&#8971;":"⌋","&#9674;":"◊","&#9824;":"♠","&#9827;":"♣","&#9829;":"♥","&#9830;":"♦","&Aacute;":"Á","&aacute;":"á","&Abreve;":"Ă","&abreve;":"ă","&Acirc;":"Â","&acirc;":"â","&acute;":"´","&AElig;":"Æ","&aelig;":"æ","&Agrave;":"À","&agrave;":"à","&Alpha;":"Α","&alpha;":"α","&Amacr;":"Ā","&amacr;":"ā","&amp;":"&","&and;":"∧","&ang;":"∠","&Aogon;":"Ą","&aogon;":"ą","&Aring;":"Å","&aring;":"å","&asymp;":"≈","&Atilde;":"Ã","&atilde;":"ã","&Auml;":"Ä","&auml;":"ä","&bdquo;":"„","&Beta;":"Β","&beta;":"β","&brvbar;":"¦","&bull;":"•","&Cacute;":"Ć","&cacute;":"ć","&cap;":"∩","&Ccaron;":"Č","&ccaron;":"č","&Ccedil;":"Ç","&ccedil;":"ç","&Ccirc;":"Ĉ","&ccirc;":"ĉ","&Cdot;":"Ċ","&cdot;":"ċ","&cedil;":"¸","&cent;":"¢","&Chi;":"Χ","&chi;":"χ","&circ;":"ˆ","&clubs;":"♣","&cong;":"≅","&copy;":"©","&crarr;":"↵","&cup;":"∪","&curren;":"¤","&dagger;":"†","&Dagger;":"‡","&darr;":"↓","&Dcaron;":"Ď","&dcaron;":"ď","&deg;":"°","&Delta;":"Δ","&delta;":"δ","&diams;":"♦","&divide;":"÷","&dot;":"·","&Dstrok;":"Đ","&dstrok;":"đ","&Eacute;":"É","&eacute;":"é","&Ebreve;":"Ĕ","&ebreve;":"ĕ","&Ecaron;":"Ě","&ecaron;":"ě","&Ecirc;":"Ê","&ecirc;":"ê","&Edot;":"Ė","&edot;":"ė","&Egrave;":"È","&egrave;":"è","&Emacr;":"Ē","&emacr;":"ē","&empty;":"∅","&emsp;":" ","&ENG;":"Ŋ","&eng;":"ŋ","&ensp;":" ","&Eogon;":"Ę","&eogon;":"ę","&Epsilon;":"Ε","&epsilon;":"ε","&equiv;":"≡","&Eta;":"Η","&eta;":"η","&ETH;":"Ð","&eth;":"ð","&Euml;":"Ë","&euml;":"ë","&euro;":"€","&exist;":"∃","&fnof;":"ƒ","&forall;":"∀","&frac12;":"½","&frac14;":"¼","&frac34;":"¾","&Gamma;":"Γ","&gamma;":"γ","&Gbreve;":"Ğ","&gbreve;":"ğ","&Gcedil;":"Ģ","&gcedil;":"ģ","&Gcirc;":"Ĝ","&gcirc;":"ĝ","&Gdot;":"Ġ","&gdot;":"ġ","&ge;":"≥","&gt;":">","&harr;":"↔","&Hcirc;":"Ĥ","&hcirc;":"ĥ","&hearts;":"♥","&hellip;":"…","&Hstrok;":"Ħ","&hstrok;":"ħ","&Iacute;":"Í","&iacute;":"í","&Ibreve;":"Ĭ","&ibreve;":"ĭ","&Icirc;":"Î","&icirc;":"î","&Idot;":"İ","&iexcl;":"¡","&Igrave;":"Ì","&igrave;":"ì","&IJlig;":"Ĳ","&ijlig;":"ĳ","&Imacr;":"Ī","&imacr;":"ī","&inodot;":"ı","&infin;":"∞","&int;":"∫","&Iogon;":"Į","&iogon;":"į","&Iota;":"Ι","&iota;":"ι","&iquest;":"¿","&isin;":"∈","&Itilde;":"Ĩ","&itilde;":"ĩ","&Iuml;":"Ï","&iuml;":"ï","&Jcirc;":"Ĵ","&jcirc;":"ĵ","&Kappa;":"Κ","&kappa;":"κ","&Kcedil;":"Ķ","&kcedil;":"ķ","&kgreen;":"ĸ","&Lacute;":"Ĺ","&lacute;":"ĺ","&Lambda;":"Λ","&lambda;":"λ","&laquo;":"«","&larr;":"←","&Lcaron;":"Ľ","&lcaron;":"ľ","&Lcedil;":"Ļ","&lcedil;":"ļ","&lceil;":"⌈","&ldquo;":"“","&le;":"≤","&lfloor;":"⌊","&Lmidot;":"Ŀ","&lmidot;":"ŀ","&lowast;":"∗","&loz;":"◊","&lrm;":"‎","&lsaquo;":"‹","&lsquo;":"‘","&Lstrok;":"Ł","&lstrok;":"ł","&lt;":"<","&macr;":"¯","&mdash;":"—","&micro;":"µ","&minus;":"−","&Mu;":"Μ","&mu;":"μ","&nabla;":"∇","&Nacute;":"Ń","&nacute;":"ń","&napos;":"ŉ","&nbsp;":" ","&Ncaron;":"Ň","&ncaron;":"ň","&Ncedil;":"Ņ","&ncedil;":"ņ","&ndash;":"–","&ne;":"≠","&NewLine;":"\n","&ni;":"∋","&not;":"¬","&notin;":"∉","&nsub;":"⊄","&Ntilde;":"Ñ","&ntilde;":"ñ","&Nu;":"Ν","&nu;":"ν","&Oacute;":"Ó","&oacute;":"ó","&Obreve;":"Ŏ","&obreve;":"ŏ","&Ocirc;":"Ô","&ocirc;":"ô","&Odblac;":"Ő","&odblac;":"ő","&OElig;":"Œ","&oelig;":"œ","&Ograve;":"Ò","&ograve;":"ò","&oline;":"‾","&Omacr;":"Ō","&omacr;":"ō","&Omega;":"Ω","&omega;":"ω","&Omicron;":"Ο","&omicron;":"ο","&oplus;":"⊕","&or;":"∨","&ordf;":"ª","&ordm;":"º","&Oslash;":"Ø","&oslash;":"ø","&Otilde;":"Õ","&otilde;":"õ","&otimes;":"⊗","&Ouml;":"Ö","&ouml;":"ö","&para;":"¶","&part;":"∂","&permil;":"‰","&perp;":"⊥","&Phi;":"Φ","&phi;":"φ","&Pi;":"Π","&pi;":"π","&piv;":"ϖ","&plusmn;":"±","&pound;":"£","&prime;":"′","&Prime;":"″","&prod;":"∏","&prop;":"∝","&Psi;":"Ψ","&psi;":"ψ","&quot;":"\"","&Racute;":"Ŕ","&racute;":"ŕ","&radic;":"√","&raquo;":"»","&rarr;":"→","&Rcaron;":"Ř","&rcaron;":"ř","&Rcedil;":"Ŗ","&rcedil;":"ŗ","&rceil;":"⌉","&rdquo;":"”","&reg;":"®","&rfloor;":"⌋","&Rho;":"Ρ","&rho;":"ρ","&rlm;":"‏","&rsaquo;":"›","&rsquo;":"’","&Sacute;":"Ś","&sacute;":"ś","&sbquo;":"‚","&Scaron;":"Š","&scaron;":"š","&Scedil;":"Ş","&scedil;":"ş","&Scirc;":"Ŝ","&scirc;":"ŝ","&sdot;":"⋅","&sect;":"§","&shy;":"­","&Sigma;":"Σ","&sigma;":"σ","&sigmaf;":"ς","&sim;":"∼","&spades;":"♠","&sub;":"⊂","&sube;":"⊆","&sum;":"∑","&sup;":"⊃","&sup1;":"¹","&sup2;":"²","&sup3;":"³","&supe;":"⊇","&szlig;":"ß","&Tab;":"\t","&Tau;":"Τ","&tau;":"τ","&Tcaron;":"Ť","&tcaron;":"ť","&Tcedil;":"Ţ","&tcedil;":"ţ","&there4;":"∴","&Theta;":"Θ","&theta;":"θ","&thetasym;":"ϑ","&thinsp;":" ","&THORN;":"Þ","&thorn;":"þ","&tilde;":"˜","&times;":"×","&trade;":"™","&Tstrok;":"Ŧ","&tstrok;":"ŧ","&Uacute;":"Ú","&uacute;":"ú","&uarr;":"↑","&Ubreve;":"Ŭ","&ubreve;":"ŭ","&Ucirc;":"Û","&ucirc;":"û","&Udblac;":"Ű","&udblac;":"ű","&Ugrave;":"Ù","&ugrave;":"ù","&Umacr;":"Ū","&umacr;":"ū","&uml;":"¨","&Uogon;":"Ų","&uogon;":"ų","&upsih;":"ϒ","&Upsilon;":"Υ","&upsilon;":"υ","&Uring;":"Ů","&uring;":"ů","&Utilde;":"Ũ","&utilde;":"ũ","&Uuml;":"Ü","&uuml;":"ü","&Wcirc;":"Ŵ","&wcirc;":"ŵ","&Xi;":"Ξ","&xi;":"ξ","&Yacute;":"Ý","&yacute;":"ý","&Ycirc;":"Ŷ","&ycirc;":"ŷ","&yen;":"¥","&yuml;":"ÿ","&Yuml;":"Ÿ","&Zeta;":"Ζ","&zeta;":"ζ","&zwj;":"‍","&zwnj;":"‌"}

export function transformImage(value: string | Record<string, string>) {
  if (typeof value === 'string')
    return [value]

  if (value.url)
    return [value.url]

  if (Array.isArray(value))
    return value

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
        return cleanHtmlCodes(value)

    if (value.name)
        return cleanHtmlCodes(value.name)

    if (Array.isArray(value)) {
        const array = value as any[];
        if (array.length > 0) {
          const first = array[0];
            if (typeof first === 'string') {
                return first;
            }

            if (first.name) {
              return cleanHtmlCodes(first.name);
            }
        }
    } else if (typeof value === 'object') {
        if (value.name) {
          return cleanHtmlCodes(value.name);
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

  return cleanHtmlCodes(cleaned)
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

export function cleanHtmlCodes(str: string) {
  if (!str || typeof str !== 'string') {
    return str
  }

  const regex = new RegExp(Object.keys(htmlCodes).join('|'), 'g');
  // @ts-ignore
  return str.replace(regex, (match) => htmlCodes[match]);
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
