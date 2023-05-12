import { GoogleDocEnhanced } from '@/lib/unbody/unbody.types'
import { ArticleReference } from '@/components/ArticleReference'
import { Collapse } from '@/components/Collapse'

const ArticleRelatedArticles = ({ data }: { data: GoogleDocEnhanced[] }) =>
  data.length > 0 ? (
    <Collapse label="Related Articles">
      {data.map((article, idx) => (
        <ArticleReference key={idx} data={article} />
      ))}
    </Collapse>
  ) : null

export default ArticleRelatedArticles
