package graph

import (
	"../data"
	"github.com/graphql-go/graphql"
	"log"
	"errors"
)

var schema graphql.Schema

func init() {
	relationshipCardType := graphql.NewObject(graphql.ObjectConfig{
		Name: "RelationshipCard",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.ID,
				Resolve: resolveRelationshipCardID,
			},
		},
	})

	accountType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Account",
		Fields: graphql.Fields{
			"relationshipCards": &graphql.Field{
				Type: graphql.NewList(relationshipCardType),
				Resolve: resolveAccountRelationshipCards,
			},
		},
	})

	queryType := graphql.NewObject(graphql.ObjectConfig{
		Name: "RootQuery",
		Fields: graphql.Fields{
			"me": &graphql.Field{
				Type: accountType,
				Resolve: resolveMe,
			},
		},
	})

	schemaConfig := graphql.SchemaConfig{Query: queryType}

	var err error
	schema, err = graphql.NewSchema(schemaConfig)
	if err != nil {
		log.Fatalf("Error building graph: %v", err)
	}
}

func PerformQuery(query string) (*graphql.Result) {
	params := graphql.Params{Schema: schema, RequestString: query}
	return graphql.Do(params)
}

func resolveMe(p graphql.ResolveParams) (interface{}, error) {
	// Load data
	return data.Load()
}

func resolveAccountRelationshipCards(p graphql.ResolveParams) (interface{}, error) {
	if account, ok := p.Source.(*data.Account); ok {
		return account.RelationshipCards, nil
	}
	return nil, errors.New("not an Account")
}

func resolveRelationshipCardID(p graphql.ResolveParams) (interface{}, error) {
	if card, ok := p.Source.(*data.RelationshipCard); ok {
		return card.ID, nil
	}

	return nil, errors.New("not a RelationshipCard")
}
