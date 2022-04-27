const search = instantsearch({
  indexName: "ecommerceIndex",
  searchClient: algoliasearch("Y4EB0H7RA7", "9cac6fd52117d5b949658f2f4813bbe8"),
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 10,
  }),
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search for products by name, type, brand ...",
  }),
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: data => `
          <div>
            <img src="${data.image}" align="left" alt="${data.name}" />
            <div class="hit-name">
              <h4>${data._highlightResult.name.value}</h4>
            </div>
            <div class="hit-description">
              <h4>${data._highlightResult.description.value}</h4>
            </div>
            <div class="hit-price">
              $${data.price}
            </div>
            <p>${data.description}</p>
          </div>
        `,
      empty: "<h5>No results ... please consider another query</h5>"
    },
  }),
  instantsearch.widgets.pagination({
    container: "#pagination",
  }),
]);

search.start();