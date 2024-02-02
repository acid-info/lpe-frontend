import { POSTS_IMAGE_PLACEHOLDER_DIR } from '@/configs/consts.configs'
import { uiConfigs } from '@/configs/ui.configs'
import {
  getStrapiImageUrlBySize,
  transformStrapiImageUrl,
} from '@/services/strapi/transformers/utils'
import axios from 'axios'
import sharp from 'sharp'

export class PlaceholderService {
  cache = new Map<string, string>()
  constructor() {}

  add(key: string, value: string) {
    this.cache.set(key, value)
  }

  exists(key: string): boolean {
    return this.cache.has(key)
  }

  emptyCache() {
    this.cache.clear()
  }

  async pixelate(imagePath: string): Promise<string> {
    if (imagePath.length === 0 || imagePath.endsWith('.svg')) return ''

    const fileName = imagePath.split('/').pop() as string

    if (this.exists(fileName)) return this.cache.get(fileName) as string

    try {
      const filePath = `${POSTS_IMAGE_PLACEHOLDER_DIR}/${fileName}`
      const thumbnailPath = getStrapiImageUrlBySize('thumbnail', imagePath)
      const imageUrl = transformStrapiImageUrl(thumbnailPath)
      const imageBuffer = (
        await axios({ url: imageUrl, responseType: 'arraybuffer' })
      ).data as Buffer

      await sharp(
        await sharp(imageBuffer)
          .resize(uiConfigs.imageRender.placeholder.pixelation * 100, null, {
            kernel: sharp.kernel.cubic,
          })
          .toBuffer(),
      )
        .resize(uiConfigs.imageRender.placeholder.pixelation * 400, null, {
          kernel: sharp.kernel.nearest,
        })
        .toFile(filePath)

      this.add(fileName, filePath)

      return filePath
    } catch (e) {
      console.log(e)
    }

    return ''
  }
}
