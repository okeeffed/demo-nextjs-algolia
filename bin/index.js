require("dotenv-flow/config");
const algoliasearch = require("algoliasearch");

const BLOG_POSTS = [
  {
    objectID: "feeding-your-cat",
    title: "Feeding Your Cat",
    description:
      "Discussing the best practices for feeding your cat, including diet and portion control.",
  },
  {
    objectID: "cat-behavior-problems",
    title: "Cat Behavior Problems",
    description:
      "Addressing common behavior problems in cats and how to resolve them.",
  },
  {
    objectID: "grooming-tips-for-cats",
    title: "Grooming Tips for Cats",
    description:
      "Providing grooming tips and techniques to keep your cat's coat healthy and clean.",
  },
  {
    objectID: "choosing-the-right-cat-litter",
    title: "Choosing the Right Cat Litter",
    description:
      "Guide on selecting the right cat litter for your cat's needs.",
  },
  {
    objectID: "vaccination-schedule-for-cats",
    title: "Vaccination Schedule for Cats",
    description:
      "Information on the recommended vaccination schedule for cats.",
  },
  {
    objectID: "cat-scratch-prevention",
    title: "Cat Scratch Prevention",
    description: "Tips for preventing cat scratches and protecting furniture.",
  },
  {
    objectID: "indoor-vs-outdoor-cats",
    title: "Indoor vs. Outdoor Cats",
    description:
      "Comparing the pros and cons of keeping your cat indoors versus letting them roam outdoors.",
  },
  {
    objectID: "cat-health-checklist",
    title: "Cat Health Checklist",
    description:
      "A checklist for maintaining your cat's health, including regular vet visits.",
  },
  {
    objectID: "cat-toys-and-enrichment",
    title: "Cat Toys and Enrichment",
    description:
      "Exploring different toys and activities to keep your cat mentally and physically stimulated.",
  },
  {
    objectID: "adopting-a-rescue-cat",
    title: "Adopting a Rescue Cat",
    description:
      "A guide to adopting a rescue cat, including what to expect and how to prepare.",
  },
];

async function main() {
  try {
    // initialize the client with your environment variables
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_ADMIN_KEY
    );

    // initialize the index with your index name
    const index = client.initIndex("dev_example");

    // save the objects!
    const algoliaResponse = await index.saveObjects(BLOG_POSTS);

    // check the output of the response in the console
    console.log(`🎉 Sucessfully added`);
  } catch (error) {
    console.log(error);
  }
}

main();
