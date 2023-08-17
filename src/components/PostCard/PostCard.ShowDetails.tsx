import { LPE } from '@/types/lpe.types'
import Link from 'next/link'

export interface PostCardShowDetailsProps {
  title: string
  slug: string
  episodeNumber: number
  logo: LPE.Image.Document
}

// TODO
export const PostCardShowDetails = (props: PostCardShowDetailsProps) => {
  return (
    <Link href={`/podcast/${props.slug}`}>
      <span>{props.title}</span>
    </Link>
  )
}
