import { describe, expect, it } from 'vitest'

import tokenizer from '../src/controllers/generate_controller.js'

// All tests within this suite will be run in parallel
describe.concurrent('suite', () => {
    it('concurrent test 1', async () => { 
        const key = tokenizer.getKey()
        expect(key).toBeTypeOf('object')
    })

    it('concurrent test 2', async () => { 
        const key = tokenizer.getToken()
        expect(key).toBeTypeOf('object')
    })

})
