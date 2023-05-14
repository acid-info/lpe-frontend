import { ArticleReference } from '@/components/ArticleReference'
import { GoogleDocEnhanced } from '@/lib/unbody/unbody.types'
import styles from '../Article.module.css'
import { Collapse } from '@/components/Collapse'

const FromSameAuthorsArticles = ({ data }: { data: GoogleDocEnhanced[] }) =>
  data.length > 0 ? (
    <Collapse className={styles.relatedArticles} label="From The Same Authors">
      {data.map((article, idx) => (
        <ArticleReference key={idx} data={article} />
      ))}
    </Collapse>
  ) : null

export default FromSameAuthorsArticles
