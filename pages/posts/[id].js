import Head from 'next/head'
import Layout from '@/components/layout'
import { getAllPostIds, getPostData } from '@/lib/posts'
import Date from '@/components/date'
import utilStyles from '@/styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  // idとしてとりうる値のリストを返す
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // const allPostsData = getSortedPostsData()
  const postData = await getPostData(params.id)
  console.log('postData', postData)
  return {
    props: {
      postData,
    },
  }
}
