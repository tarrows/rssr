import React from 'react'
import { NextPage } from 'next'
import config from '../../config/rss.json'
import Parser from 'rss-parser'

type Props = {
  feed: unknown
}

const FeedPage: NextPage<Props> = (props) => {
  const { feed } = props
  return <div>{JSON.stringify(feed, undefined, 2)}</div>
}


export const getStaticPaths = async () => {
  return {
    paths: config.targets.map(item => ({
      params: { rss: item.path }
    })),
    fallback: false,
  }
}


export const getStaticProps = async ({ params }) => {
  const target = config.targets.find(item => item.path === params.rss)
  if (!target) {
    return { feed: undefined }
  }
  const parser = new Parser()
  const feed = await parser.parseURL(target.url)

  return {
    props: { feed }
  }
}


export default FeedPage
