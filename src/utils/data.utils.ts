import { LPE } from '@/types/lpe.types'

function hasClassName(inputString: string, className: string) {
  const regex = new RegExp(`class\\s*=\\s*"[^"]*\\b${className}\\b[^"]*"`)
  return regex.test(inputString)
}

export const shuffle = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export const unique = (arr: any[]) => Array.from(new Set(arr))

export const getAudioSourceFromEpisode = async (episodId: string) => {
  const myHeaders = new Headers()
  myHeaders.append(
    'Authorization',
    'Bearer eyJhcGlfa2V5IjoiMzg3OTdhY2Y5N2NmZjgzZjQxNGI5ODNiN2E2MjY3NmQifQ==',
  )

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  const result = await fetch(
    `https://api.simplecast.com/episodes/${episodId}`,
    requestOptions,
  )

  const data = await result.json()
  return data
}

export const parseInt = (
  inp: any,
  defaultValue?: number,
): number | undefined => {
  if (Array.isArray(inp))
    return (
      inp
        .map((value) => parseInt(value))
        .find((value) => typeof value === 'number') ?? defaultValue
    )

  let val = inp
  if (typeof val === 'number') return val
  if (typeof val === 'string') {
    val = Number.parseInt(val, 10)
    return Number.isNaN(val) ? defaultValue : val
  }

  return defaultValue
}

export const transformPostData = (
  post: LPE.Post.Document,
  shows: LPE.Podcast.Show[] = [],
) => {
  const show =
    post.type === 'podcast'
      ? post.show || shows.find((show) => show.id === post.showId) || shows[0]
      : undefined

  return {
    date:
      post.type === 'podcast'
        ? post.publishedAt
          ? new Date(post.publishedAt)
          : null
        : post.modifiedAt
        ? new Date(post.modifiedAt)
        : null,
    slug: post.slug,
    title: post.title,
    authors: post.type === 'article' ? post.authors : [],
    coverImage: post.coverImage,
    subtitle: (post.type === 'article' && post.subtitle) || '',
    tags: post.tags,
    ...(post.type === 'podcast' && show
      ? {
          podcastShowDetails: {
            episodeNumber: post.episodeNumber,
            title: show.title,
            slug: show.slug,
            podcast: show,
          },
        }
      : {}),
  }
}
