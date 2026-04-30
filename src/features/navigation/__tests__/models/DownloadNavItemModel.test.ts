import { describe, expect, it } from 'vitest'
import { DownloadNavItemModel } from '../../models/DownloadNavItemModel'

describe('DownloadNavItemModel', () => {
  it('accepts http/https/blob/data schemes', () => {
    const variants = [
      'http://example.com/cv.pdf',
      'https://example.com/cv.pdf',
      'blob:https://example.com/abc',
      'data:text/plain;base64,Zm9v',
    ]

    for (const url of variants) {
      const model = new DownloadNavItemModel({
        id: `download-${url.split(':')[0]}`,
        icon: 'download',
        url,
      })

      expect(model.toAnchorAttrs().href).toContain(url.split(':')[0])
    }
  })

  it('rejects unsupported schemes', () => {
    expect(
      () =>
        new DownloadNavItemModel({
          id: 'mailto',
          icon: 'download',
          url: 'mailto:me@soyaaroncervantes.com',
        })
    ).toThrow('Scheme mailto: not allowed')
  })

  it('sets empty download attr when filename is omitted', () => {
    const model = new DownloadNavItemModel({
      id: 'download',
      icon: 'download',
      url: 'https://example.com/cv.pdf',
    })

    expect(model.toAnchorAttrs()).toMatchObject({
      download: '',
    })
  })

  it('sets explicit filename when provided', () => {
    const model = new DownloadNavItemModel({
      id: 'download',
      icon: 'download',
      url: 'https://example.com/cv.pdf',
      filename: 'aaron-cv.pdf',
    })

    expect(model.toAnchorAttrs()).toMatchObject({
      download: 'aaron-cv.pdf',
    })
  })
})
