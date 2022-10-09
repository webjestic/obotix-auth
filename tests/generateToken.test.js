import { describe, expect, it } from 'vitest'

import tokenizer from '../src/controllers/generate_controller.js'

// All tests within this suite will be run in parallel
describe.concurrent('suite', () => {
    it('concurrent test 1', async () => { 
        const key = tokenizer.randomKey()
        expect(key).toBeTypeOf('string')
        expect(key.length).toBe(36)
    })

    it('concurrent test 2', async () => { 
        const key = tokenizer.randomToken()
        expect(key).toBeTypeOf('string')
        expect(key.length).toBe(512)
    })

    it.concurrent('concurrent test 3', async () => { 
        const key = tokenizer.randomBase64(24)
        expect(key).toBeTypeOf('string')
        expect(key.length).toBe(24)
    })

    it.concurrent('concurrent test 3', async () => { 
        const key = tokenizer.randomHex(24)
        expect(key).toBeTypeOf('string')
        expect(key.length).toBe(24)
    })
})
