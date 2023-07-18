# ResearchTrack


Run the project with the command:
```
yarn start
```
and then view the results in the browser at http://localhost:3000/

Example cURL to call the search API
```
curl --location --request GET 'https://fc60682851a14349a1650e65dda922dd.us-central1.gcp.cloud.es.io:443/research-track/_search' \
--header 'Authorization: apiKey <API key>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "query": {
    "multi_match": {
      "query": "David",
      "type": "cross_fields",
      "operator": "or",
      "fields": ["*"]
    }
  }
}'

```

Reference:
- [Search UI with Elasticsearch](https://docs.elastic.co/search-ui/tutorials/elasticsearch)

