import { NotFound } from '@/components/NotFound'
import { SEO } from '@/components/SEO'
import NotFoundLayout from '@/layouts/NotFoundLayout/NotFound.layout'
import { ReactNode } from 'react'

const NotFoundPage = () => {
  return (
    <>
      <SEO
        title={'Not Found'}
        description={'Description'}
        imageUrl={undefined}
        tags={[]}
        pagePath={`/404`}
      />
      <NotFound />
    </>
  )
}

NotFoundPage.getLayout = function getLayout(page: ReactNode) {
  return <NotFoundLayout>{page}</NotFoundLayout>
}

export default NotFoundPage
