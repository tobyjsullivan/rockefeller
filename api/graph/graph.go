package graph

import (
	"log"

	"../data"
	"github.com/graphql-go/graphql"
)

var (
	schema graphql.Schema

	queryType = graphql.NewObject(graphql.ObjectConfig{
		Name: "RootQuery",
		Fields: graphql.Fields{
			"me": &graphql.Field{
				Type:    accountType,
				Resolve: resolveMe,
			},
		},
	})
)

func init() {
	schemaConfig := graphql.SchemaConfig{
		Query:    queryType,
		Mutation: mutationType,
	}

	var err error
	schema, err = graphql.NewSchema(schemaConfig)
	if err != nil {
		log.Fatalf("Error building graph: %v", err)
	}
}

func PerformQuery(query string, variables map[string]interface{}) *graphql.Result {
	params := graphql.Params{Schema: schema, RequestString: query, VariableValues: variables}
	return graphql.Do(params)
}

func resolveMe(p graphql.ResolveParams) (interface{}, error) {
	// Load data
	return data.Load()
}
