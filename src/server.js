import algoliasearch from "algoliasearch";
import dotenv from "dotenv";
import * as fs from "fs/promises";

dotenv.config({ path: "../.env" });

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

await setData();
await setRelevance();
await testSearches();

async function setData() {
  //
  // Using a slice here because my free Algolia account has a 10,000 record
  // quote. In fact, even slicing to 10,000 yielded a message on the dashboard
  // so I ended up reducing the slice to 9,999!
  //
  try {
    const ecommDataRaw = await fs.readFile("../ecommerce/records.json", "utf8");
    const ecommDataFull = JSON.parse(ecommDataRaw);
    const ecommDataSlice = ecommDataFull.slice(0, 9999);
    const saveObjectsResponse = await index.saveObjects(ecommDataSlice);
    console.log(saveObjectsResponse);
  } catch (err) {
    console.log(err.message);
    return;
  }
}

async function setRelevance() {
  try {
    await index.setSettings({
      searchableAttributes: [
        "brand",
        "description",
        "name",
      ],
      customRanking: [
        "asc(popularity)", 
        "desc(rating)",
      ],
      attributesForFaceting: [
        "searchable(brand)",
        "free_shipping",
        "hierarchicalCategories",
        "price",
        "type",
      ],
      numericAttributesForFiltering: ["price"], // Use rangeslider???
      // TODO: filtering???
    });
  } catch (err) {
    console.log(err.message);
    return;
  }
}

async function testSearches() {
  try {
    const searchResults = await index.search("Wind Tunnel");
    console.log(searchResults.nbHits);

    for (const hit of searchResults.hits) {
      console.log(hit);
    }
  } catch (err) {
    console.log(err.message);
    return;
  }
}
