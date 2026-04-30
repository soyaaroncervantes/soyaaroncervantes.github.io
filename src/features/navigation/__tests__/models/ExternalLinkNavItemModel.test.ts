import { describe, expect, it } from 'vitest'
import { ExternalLinkNavItemModel } from '../../models/ExternalLinkNavItemModel'

describe('ExternalLinkNavItemModel', () => {
  it('accepts http and https schemes', () => {
    const httpsModel = new ExternalLinkNavItemModel({
      id: 'github',
      icon: 'github',
      url: 'https://github.com/soyaaroncervantes',
    })
    const httpModel = new ExternalLinkNavItemModel({
      id: 'example',
      icon: 'link',
      url: 'http://example.com',
    })

    expect(httpsModel.toAnchorAttrs().href).toContain('https://github.com/soyaaroncervantes')
    expect(httpModel.toAnchorAttrs().href).toContain('http://example.com')
  })

  it('rejects non-http schemes', () => {
    expect(
      () =>
        new ExternalLinkNavItemModel({
          id: 'mailto',
          icon: 'email',
          url: 'mailto:me@soyaaroncervantes.com',
        })
    ).toThrow('Scheme mailto: not allowed')
  })

  it('sets default target and rel', () => {
    const model = new ExternalLinkNavItemModel({
      id: 'github',
      icon: 'github',
      url: 'https://github.com/soyaaroncervantes',
    })

    expect(model.toAnchorAttrs()).toMatchObject({
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })

  it('honors explicit target and rel overrides', () => {
    const model = new ExternalLinkNavItemModel({
      id: 'github',
      icon: 'github',
      url: 'https://github.com/soyaaroncervantes',
      target: '_self',
      rel: 'nofollow',
    })

    expect(model.toAnchorAttrs()).toMatchObject({
      target: '_self',
      rel: 'nofollow',
    })
  })
})
