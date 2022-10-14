import Head from 'next/head';
import { PostCard, Categories, PostWidget,  } from '../components'

import { getPosts, getRecentPosts, getCategories, getFeaturedPosts } from '../services';
import FeaturedPosts from '../sections/FeaturedPosts';
export default function Home({ posts, recentPosts, categories, featuredPosts}) {


  return (
    <>
    <Head>
      <title>YM CMS Blog</title>
    </Head>
    <div className="px-8 mb-8" style={{width:'90%', marginLeft:'auto', marginRight:'auto'}}>
      <FeaturedPosts featuredPosts = {featuredPosts}/>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget  recentPosts={recentPosts}/>
            <Categories categories={categories}/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
  
}

export const getStaticProps = async() => {

    
const data = await getPosts()
const posts = data.posts
const recentPosts = await getRecentPosts()
const categories = await getCategories()
const featuredPosts = await getFeaturedPosts()
return  {props: {
        posts,
        recentPosts,
        categories,
        featuredPosts
        }
      }
}
