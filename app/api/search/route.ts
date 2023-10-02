import algoliasearch from "algoliasearch/lite";

export async function POST(request: Request) {
  if (
    !process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID ||
    !process.env.ALGOLIA_ADMIN_KEY ||
    !process.env.ALGOLIA_INDEX_NAME
  ) {
    return new Response("Algolia credentials are missing", { status: 500 });
  }

  const algoliaClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_ADMIN_KEY
  );

  const index = algoliaClient.initIndex(process.env.ALGOLIA_INDEX_NAME);
  const pageSize = 5;

  // the number of all posts available
  const postCount = postResponse.meta.count;
  // iterating over the posts because the allPosts query is paginated
  // by default
  for (let page = 0; page < Math.ceil(postCount / pageSize); page++) {
    const posts = await request(
      allPostsGraphqlRequest(pageSize, page * pageSize)
    );
    // converting tha data retrieved by the headless CMS
    // into the desired Algolia format
    const algoliaPosts = posts.allPosts.map((post) => {
      return {
        objectID: post.id,
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        date: post.date,
      };
    });
    // saving the post info to Algolia
    await index.saveObjects(algoliaPosts);
  }

  return Response.json({ message: "Sync complete" });
}
