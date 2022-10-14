import React from 'react';
import { useRouter } from 'next/router';

import { PostDetail, PostWidget, Categories, Author, Comments, CommentsForm, Loader } from '../../components';
import { getPostDetails, getPostSlugs, getCategories, getSimilarPosts, getRecentPosts } from '../../services';



const PostDetails = ({ post, similarPosts, categories, recentPosts }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author}/> 
            <CommentsForm slug={post.slug}/>
            <Comments comments={post.comments}/>
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget similarPosts={similarPosts} slug={post.slug} recentPosts={recentPosts}/>
              <Categories categories={categories}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

export const getStaticProps = async({params})=>{
  const slug = params.slug;
  const data = await getPostDetails(slug)
  const post = data.post
  const categories = await getCategories()
  const recentPosts = await getRecentPosts()
  const postCategories = post.categories.map((category)=>(category.slug))
  const similarPosts = await getSimilarPosts(slug, postCategories)
  return {
    props: {
      post,
      categories,
      similarPosts,
      recentPosts
    },
    revalidate: 60 * 60
  }
}


export const getStaticPaths = async() =>{

  const data = await getPostSlugs()

  return {
    paths: data.posts.map((post)=>({params: {slug: post.slug}})),
    fallback: true
  }
}



