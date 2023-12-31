import React from "react";

import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields
} from "./config/config-helper";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new ElasticsearchAPIConnector({
  cloud: {
    id: "POC:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRmYzYwNjgyODUxYTE0MzQ5YTE2NTBlNjVkZGE5MjJkZCRiZjE0ZjAwZjIyYWM0NmY2YWU2ODA4NDM3MjRiNjM5Mw=="
  },
  apiKey: "bEVhTGFva0I2S3oxZ0xKa1JkbmI6TWZubUNjcDFRMTYwLTVMcmttZHQwQQ==",
  index: "*"
});
const config = {
  searchQuery: {
    search_fields: {

      // [ok] projects
      PROJECT_TITLE: {
        weight: 3
      },
      ORG_NAME: {
        weight: 5
      },
      PI_NAMEs: {
        weight: 5
      },
      IC_NAME: {},
      NIH_SPENDING_CATS: {},

      // [ok] abstracts 
      ABSTRACT_TEXT: {},

      // [ok] clinical_studies
      Study: {},

      // [ok] patents
      Claims: {},
      Title: {},
      Inventor: {},

      // [ok] publications
      AUTHOR_LIST: {
        weight: 10
      },
      AFFILIATION: {
        weight: 5
      },
      JOURNAL_TITLE: {},
      PUB_TITLE: {},

      // [ok] search-clinical_trials
      source: {},
      keyword: {},
    },
    result_fields: {
      // projects
      BUDGET_START: {
        snippet: {}
      },
      PROJECT_TITLE: {
        snippet: {}
      },
      ORG_NAME: {
        snippet: {}
      },
      PI_NAMEs: {
        snippet: {}
      },
      IC_NAME: {
        snippet: {}
      },
      NIH_SPENDING_CATS: {
        snippet: {}
      },
      PROJECT_TERMS: {
        snippet: {}
      },
      TOTAL_COST: {
        snippet: {}
      },
      ORG_COUNTRY: {
        snippet: {}
      },
      // publications
      AUTHOR_LIST: {
        snippet: {}
      },
      AFFILIATION: {
        snippet: {}
      },
      JOURNAL_TITLE: {
        snippet: {}
      },
      PUB_TITLE: {
        snippet: {}
      },
      // abstracts
      ABSTRACT_TEXT: {
        snippet: {}
      },
      // clinical_studies
      Study: {
        snippet: {}
      },
      // patents
      Claims: {
        snippet: {}
      },
      Title: {
        snippet: {}
      },
      Inventor: {
        snippet: {}
      },
      // clinical_trials
      source: {
        snippet: {}
      },
      keyword: {
        snippet: {}
      },
    },
    disjunctiveFacets: ["COUNTRY.keyword"],
    facets: {
      "COUNTRY.keyword": { type: "value" },
      BUDGET_START: {
        type: "range",
        ranges: [
          {
            from: "2022-07-18T14:40:04.821Z",
            name: "Within the last year"
          },
          {
            from: "2021-07-18T14:40:04.821Z",
            to: "2022-07-18T14:40:04.821Z",
            name: "1 - 2 years ago"
          },
          {
            to: "2021-07-18T14:40:04.821Z",
            name: "More than 2 years ago"
          }
        ]
      },
      // TOTAL_COST: {
      //   type: "range",
      //   ranges: [
      //     { from: 1.0, to: 3.0, name: "Pants" },
      //     { from: 3.0, to: 6.0, name: "Mediocre" },
      //     { from: 6.0, to: 8.0, name: "Pretty Good" },
      //     { from: 8.0, to: 10.0, name: "Excellent" }
      //   ]
      // }
    }
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      search_fields: {
        "AUTHOR_LIST.suggest": {
          weight: 10
        }
      },
      result_fields: {
        PI_NAMEs: {
          snippet: {
            size: 100,
            fallback: true
          }
        },
        url: {
          snippet: {}
        }
      }
    },
  },
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true
};
const SORT_OPTIONS = [
  {
    name: "Relevance",
    value: []
  },
  {
    name: "Funding start date",
    value: [
      {
        field: "BUDGET_START",
        direction: "asc"
      }
    ]
  }
];
export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      autocompleteMinimumCharacters={3}
                      autocompleteResults={{
                        linkTarget: "_blank",
                        sectionTitle: "Results",
                        titleField: "AUTHOR_LIST",
                        urlField: "url",
                        shouldTrackClickThrough: true
                      }}
                      autocompleteSuggestions={true}
                      debounceLength={0}
                    />
                  }
                  sideContent={
                    <div>
                      {wasSearched && <Sorting label={"Sort by"} sortOptions={SORT_OPTIONS} />}
                      <Facet key={"1"} field={"BUDGET_START"} label={"funding start date"} />
                      <Facet key={"2"} field={"COUNTRY.keyword"} label={"country"} />
                    </div>
                  }
                  bodyContent={<Results shouldTrackClickThrough={true} />}
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
