import { isRelative, normalize } from './url'

describe('#isRelative', () => {
  it('Should return true for relative url', () => {
    expect(isRelative('/foo/bar')).toBe(true)
  })

  it('Should return false for absolute url', () => {
    expect(isRelative('http://foo.bar'))
  })
})

describe('#normalize', () => {
  it('Should add trailing comma', () => {
    expect(normalize('/foo/bar')).toEqual('/foo/bar/')
  })

  it('Should not add trailing comma when exists', () => {
    expect(normalize('/foo/bar/')).toEqual('/foo/bar/')
  })
})
