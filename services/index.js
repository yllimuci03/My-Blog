import  {request, gql, GraphQLClient} from 'graphql-request'
const client = new GraphQLClient(process.env.ENDPOINT)


export const getPosts = async () => {
 const query = gql`
  query MyPosts{
     posts(orderBy: createdAt_DESC){
          author {
           name
           photo {
             url
           }
         }
        featuredImage {
           url
         }
         title
         slug
         createdAt
        categories {
          name
          slug
        }
     }

  }
 `
const data = await client.request(query)
return data;
}

export const getPostDetails = async (slug) => {
   const query = gql`
    query Post($slug: String!){
      post(where: {slug: $slug}){
          title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
          html
        }
        categories {
          name
          slug
        }

        comments{
          ...on Comment{
            id
            name 
            createdAt
            comment
          }
        }

      }
    }
  `
 const data = client.request(query, {slug})
 
 return data
}

export const getPostSlugs = async() => {
 const query = gql`
  query Slugs{
   posts{
    slug
   }
  }
 `
 const data = await client.request(query)
 return data
}

export const getRecentPosts = async () => {
  const query = gql`
   query {
    posts(orderBy: createdAt_ASC
    last: 3
    )
    {
      title
      featuredImage{
        url
      }
      createdAt
      slug
    }
   }
  `

const data = await client.request(query)
 return data.posts

}

export const getSimilarPosts = async (slug, categories) => {
  const query = gql`
    query SimilarPosts($slug: String!, $categories: [String!]){
      posts(where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
      last: 3)
      {
      title
      featuredImage{
        url
      }
      createdAt
      slug
    }

    }
  `
  const data = await client.request(query, {slug, categories})
  return data.posts
}


export const getCategories = async() => {
 const query = gql`
  query Categories{
   categories{
    slug
    name
   }
  }
 `
 const data = await client.request(query)
 return data.categories
}


export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const publishComment = async (id) => {
  const result = await fetch('/api/publishComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  });

  return result.json();
};

export const getFeaturedPosts = async () =>{
  const query = gql`
  query{
  posts(where: {featuredPost: true}, orderBy: createdAt_DESC){
    featuredImage{
      url
      
    }
    title
    slug
    createdAt
    author{
    name
    bio
    photo {
      url
    }
    }

  }
}
  `
  const data = await client.request(query)
  return data.posts
}

export const getCategoryPosts = async (slug) => {
  const query = gql`
   query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await client.request(query, {slug})
  return result.postsConnection.edges
}