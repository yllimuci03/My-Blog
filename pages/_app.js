import '../styles/globals.scss'
import React from 'react'
import { Layout } from '../components'
import {getCategories} from '../services'
function MyApp({ Component, pageProps,}) {
  return (
  <Layout categories={pageProps.categories}>
    <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp

export async function getStaticProps(){
  const categories = await getCategories();
  return {
    props:{
      categories
    }
  }
}