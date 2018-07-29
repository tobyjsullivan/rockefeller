package graph

import (
	"log"

	"../data"
	"github.com/graphql-go/graphql"
)

type DataSource interface {
	Load() (*data.Account, error)
	Save(*data.Account) error
}

type API struct {
	data   DataSource
	schema *graphql.Schema
}

func New(data DataSource) *API {
	api := &API{
		data:   data,
		schema: nil,
	}

	schema, err := createSchema(api)
	if err != nil {
		log.Fatalf("Error building graph: %v", err)
	}

	api.schema = &schema

	return api
}

func (api *API) PerformQuery(query string, variables map[string]interface{}) *graphql.Result {
	params := graphql.Params{Schema: *api.schema, RequestString: query, VariableValues: variables}
	return graphql.Do(params)
}
