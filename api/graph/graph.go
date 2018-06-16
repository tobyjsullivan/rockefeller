package graph

import (
	"errors"
	"log"

	"../data"
	"github.com/graphql-go/graphql"
	"github.com/satori/go.uuid"
)

var schema graphql.Schema

func init() {
	relationshipCardType := graphql.NewObject(graphql.ObjectConfig{
		Name: "RelationshipCard",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type:    graphql.NewNonNull(graphql.ID),
				Resolve: resolveRelationshipCardID,
			},
			"name": &graphql.Field{
				Type:    graphql.NewNonNull(graphql.String),
				Resolve: resolveRelationshipCardName,
			},
		},
	})

	accountType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Account",
		Fields: graphql.Fields{
			"relationshipCards": &graphql.Field{
				Type:    graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(relationshipCardType))),
				Resolve: resolveAccountRelationshipCards,
			},
		},
	})

	queryType := graphql.NewObject(graphql.ObjectConfig{
		Name: "RootQuery",
		Fields: graphql.Fields{
			"me": &graphql.Field{
				Type:    accountType,
				Resolve: resolveMe,
			},
		},
	})

	mutationType := graphql.NewObject(graphql.ObjectConfig{
		Name: "RootMutation",
		Fields: graphql.Fields{
			"createRelationshipCard": &graphql.Field{
				Type:        relationshipCardType,
				Description: "Create a new Relationship Card",
				Args: graphql.FieldConfigArgument{
					"name": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: resolveCreateRelationshipCard,
			},
		},
	})

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

func PerformQuery(query string) *graphql.Result {
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

func resolveRelationshipCardName(p graphql.ResolveParams) (interface{}, error) {
	if card, ok := p.Source.(*data.RelationshipCard); ok {
		return card.Name, nil
	}

	return nil, errors.New("not a RelationshipCard")
}

func resolveCreateRelationshipCard(p graphql.ResolveParams) (interface{}, error) {
	name, ok := p.Args["name"].(string)
	if !ok {
		return nil, errors.New("failed to parse name arg")
	}

	// Reload data on every mutation to ensure we are updating most recent version.
	// Particularly important for multiple mutations in a single request (which will be resolved in series).
	acct, err := data.Load()
	if err != nil {
		return nil, err
	}

	id, err := uuid.NewV4()
	if err != nil {
		return nil, err
	}

	card := &data.RelationshipCard{
		ID:   id.String(),
		Name: name,
	}
	acct.RelationshipCards = append(acct.RelationshipCards, card)

	err = data.Save(acct)
	if err != nil {
		return nil, err
	}

	return card, nil
}
