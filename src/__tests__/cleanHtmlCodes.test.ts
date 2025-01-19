import { cleanHtmlCodes } from '../propertyTransforrmer';

describe('propertyTransformer', () => {

    // No codes to transform
    it('should properly escape and transform characters from a string', async () => {
        const value = 'Hello, World!'
        const result = cleanHtmlCodes(value)
        expect(result).toBe(value)
    });

    // Transform single code
    it('should properly escape and transform characters from a string', async () => {
        const value = 'Hello &amp; World!'
        const result = cleanHtmlCodes(value)
        expect(result).toBe('Hello & World!')
    });


    it('should properly escape and transform characters from a string', async () => {
        const value = '&#147;Hello, World!&#148;'
        const result = cleanHtmlCodes(value)
        expect(result).toBe('“Hello, World!”')
    });

})