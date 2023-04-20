import Post, { PostProps } from './Post'

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
    aspectRatio: 'portrait', // different aspect ratio
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
]

const PostsDemo = () => {
  return (
    <div style={{ marginTop: '78px' }}>
      {/* For Demo purposes only. Use inline CSS and styled components temporarily */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          gap: '24px',
        }}
      >
        {postsData.map((post, index) => (
          <div
            style={{
              padding: '16px 0',
              borderTop: '1px solid rgb(var(--lsd-theme-primary))',
            }}
          >
            <Post key={index} {...post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostsDemo
