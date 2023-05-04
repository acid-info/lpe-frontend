import { PostContainer } from '../PostContainer'
import { PostProps } from './Post'

const postsData: PostProps[] = [
  {
    size: 'small', // 'small' | 'large'
    classType: 'article', // 'article' | 'podcast'
    postType: 'body', // 'body' | 'header' => TBD
    styleType: 'lsd', // 'lsd' | 'default' => WIP
    aspectRatio: 'landscape', // 'portrait' | 'landscape' | 'square'
    showImage: true, // true | false
    imageUrl:
      'https://images.pexels.com/photos/4429335/pexels-photo-4429335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(),
    title: 'Preventing an Orwellian Future with Privacy-Enhancing Technology',
    description:
      'We built a pedal-powered generator and controller, which is practical to use as an energy source and exercise machine in a household -- and which you can integrate into a solar PV ',
    author: 'Jason Freeman',
    tags: ['Privacy', 'Security', 'Liberty'],
  },
  {
    aspectRatio: 'portrait', // different aspect ratio - portrait
    imageUrl:
      'https://images.pexels.com/photos/4992820/pexels-photo-4992820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(),
    title: 'How to Build a Practical Household Bike Generator',
    description:
      'We built a pedal-powered generator and controller, which is practical to use as an energy source and exercise machine in a household -- and which you can integrate into a solar PV',
    author: 'Jason Freeman',
    tags: ['Privacy', 'Security', 'Liberty'],
  },
  {
    classType: 'podcast', // podcast
    imageUrl:
      'https://images.pexels.com/photos/6039256/pexels-photo-6039256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(),
    title: 'How to Build a Practical Household Bike Generator',
    author: 'Jason Freeman',
    tags: ['Privacy', 'Security', 'Liberty'],
  },
  {
    showImage: false, // without image
    classType: 'article',
    date: new Date(),
    title: 'How to Build a Practical Household Bike Generator',
    description:
      'We built a pedal-powered generator and controller, which is practical to use as an energy source and exercise machine in a household -- and which you can integrate into a solar PV',
    author: 'Jason Freeman',
    tags: ['Privacy', 'Security', 'Liberty'],
  },
  {
    postType: 'header', // header? TBD
    imageUrl:
      'https://images.pexels.com/photos/6039256/pexels-photo-6039256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(),
    title: 'How to Build a Practical Household Bike Generator',
    description:
      'We built a pedal-powered generator and controller, which is practical to use as an energy source and exercise machine in a household -- and which you can integrate into a solar PV',
  },
  {
    showImage: false, // without image
    classType: 'article',
    date: new Date(),
    title: 'Satoshi breaks their silence: Inside the mind of the OG anon',
    description:
      "Bitcoin's creator reveals their feelings on privacy, CBDCs and their favorite NFT collection in an unprecedented interview with Acid.info",
    author: 'Jason Freeman',
    tags: ['Privacy', 'Security', 'Liberty'],
  },
  {
    aspectRatio: 'square', // square
    imageUrl:
      'https://images.pexels.com/photos/6477673/pexels-photo-6477673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(),
    title: 'How to Build a Practical Household Bike Generator',
    description:
      'We built a pedal-powered generator and controller, which is practical to use as an energy source and exercise machine in a household -- and which you can integrate into a solar PV',
    author: 'Jason Freeman',
    tags: ['Privacy', 'Security', 'Liberty'],
  },
  {
    // featured
    imageUrl:
      'https://images.pexels.com/photos/6227715/pexels-photo-6227715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(),
    title: 'How to Build a Practical Household Bike Generator',
    description:
      'We built a pedal-powered generator and controller, which is practical to use as an energy source and exercise machine in a household -- and which you can integrate into a solar PV',
    author: 'Jason Freeman',
    tags: ['Privacy', 'Security', 'Liberty'],
  },
]

const PostsDemo = () => {
  return (
    <div style={{ marginTop: '78px' }}>
      {/* For Demo purposes only. Use inline CSS and styled components temporarily */}
      <PostContainer title="Featured" postsData={[postsData[7]]} />
      <PostContainer
        style={{ marginTop: '108px' }}
        title="Latest Posts"
        postsData={[postsData[3], postsData[0], postsData[3], postsData[2]]}
      />
      <PostContainer
        style={{ marginTop: '16px' }}
        postsData={[postsData[3], postsData[5]]}
      />
      <PostContainer
        style={{ marginTop: '16px' }}
        postsData={[postsData[1], postsData[5], postsData[5], postsData[6]]}
      />
      <PostContainer
        style={{ marginTop: '108px' }}
        title="Podcasts"
        postsData={[postsData[2], postsData[2]]}
      />
      <PostContainer
        style={{ marginTop: '16px', paddingBottom: '108px' }}
        postsData={[postsData[2], postsData[2], postsData[2], postsData[2]]}
      />
    </div>
  )
}

export default PostsDemo
