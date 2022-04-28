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

  instantsearch.widgets.stats({
    container: "#stats",
  }),

  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: (data) => `
          <div>
            <img src="${data.image}" align="left" alt="${data.name}" />

            <div class="hit-name">
              <h4>${data._highlightResult.name.value}</h4>
              <div class="hit-price">
                $${data.price}
              </div>
            </div>
            
            <div class="hit-description">
              <p>${data._highlightResult.description.value}</p>
            </div>
          </div>
        `,
      empty: "<h5>No results ... please consider another query</h5>",
    },
  }),

  //
  // Clear Refinements
  //
  instantsearch.widgets.clearRefinements({
    container: "#clear-all",
  }),

  //
  // Hierarchichal Menu - Categories
  //
  instantsearch.widgets.panel({
    templates: {
      header: "Category",
    },
  })(instantsearch.widgets.hierarchicalMenu)({
    container: "#categories",
    attributes: [
      "hierarchicalCategories.lvl0",
      "hierarchicalCategories.lvl1",
      "hierarchicalCategories.lvl2",
    ],
  }),

  //
  // Refinement - Brands
  //
  instantsearch.widgets.panel({
    templates: {
      header: "Brands",
    },
  })(instantsearch.widgets.refinementList)({
    container: "#brands",
    attribute: "brand",
    limit: 5,
    searchable: true,
    searchablePlaceholder: "Search for brands",
    showMore: true,
    showMoreLimit: 10
  }),

  //
  // Rating Menu - Rating
  //
  instantsearch.widgets.panel({
    templates: {
      header: "Rating",
    },
  })(instantsearch.widgets.ratingMenu)({
    container: "#ratings",
    attribute: "rating",
  }),

  //
  // Range Slider - Price
  //
  instantsearch.widgets.panel({
    templates: {
      header: "Price",
    },
  })(instantsearch.widgets.rangeSlider)({
    container: "#price",
    attribute: "price",
  }),

  //
  // Menu - (Product) Type
  //
  instantsearch.widgets.panel({
    templates: {
      header: "Type",
    },
  })(instantsearch.widgets.menu)({
    container: "#types",
    attribute: "type",
  }),

  //
  // Toggle - Shipping
  //
  instantsearch.widgets.panel({
    templates: {
      header: "Shipping",
    },
  })(instantsearch.widgets.toggleRefinement)({
    container: "#shipping",
    attribute: "free_shipping",
  }),

  //
  // Pagination
  //
  instantsearch.widgets.pagination({
    container: "#pagination",
  }),
]);

search.start();
