package graph

import (
	"errors"
	"log"

	"../data"
	"github.com/graphql-go/graphql"
	"github.com/satori/go.uuid"
)

const (
	argCardId    = "cardId"
	argName      = "name"
	argMemo      = "memo"
	argFavourite = "favourite"
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
			"memo": &graphql.Field{
				Type:    graphql.String,
				Resolve: resolveRelationshipCardMemo,
			},
			"isFavourite": &graphql.Field{
				Type:    graphql.Boolean,
				Resolve: resolveRelationshipCardIsFavourite,
			},
		},
	})

	accountType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Account",
		Fields: graphql.Fields{
			"relationshipCards": &graphql.Field{
				Type:    graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(relationshipCardType))),
				Args: graphql.FieldConfigArgument{
					argFavourite: &graphql.ArgumentConfig{
						Type: graphql.Boolean,
					},
				},
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
					argName: &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: resolveCreateRelationshipCard,
			},
			"updateRelationshipCardName": &graphql.Field{
				Type:        graphql.String,
				Description: "Update the name of a Relationship Card",
				Args: graphql.FieldConfigArgument{
					argCardId: &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.ID),
					},
					argName: &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: resolveUpdateRelationshipCardName,
			},
			"updateRelationshipCardMemo": &graphql.Field{
				Type:        graphql.String,
				Description: "Update the memo of a Relationship Card",
				Args: graphql.FieldConfigArgument{
					argCardId: &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.ID),
					},
					argMemo: &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: resolveUpdateRelationshipCardMemo,
			},
			"updateRelationshipCardIsFavourite": &graphql.Field{
				Type:        graphql.String,
				Description: "Set or unset Relationship Card as favourite",
				Args: graphql.FieldConfigArgument{
					argCardId: &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.ID),
					},
					argFavourite: &graphql.ArgumentConfig{
						Type: graphql.Boolean,
					},
				},
				Resolve: resolveUpdateRelationshipCardIsFavourite,
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
	// Check for favouriteFilter
	var filterOnFavourites bool
	var includeFavourites bool
	if argFav, ok := p.Args[argFavourite]; ok {
		filterOnFavourites = true
		if fav, ok := argFav.(bool); ok {
			includeFavourites = fav
		} else {
			return nil, errors.New("failed to parse favourite arg")
		}
	}

	account, ok := p.Source.(*data.Account)
	if !ok {
		return nil, errors.New("not an Account")
	}

	var out []*data.RelationshipCard
	if filterOnFavourites {
		for _, card := range account.RelationshipCards {
			if card.Favourite == includeFavourites {
				out = append(out, card)
			}
		}
	} else {
		out = account.RelationshipCards
	}

	return out, nil
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

func resolveRelationshipCardMemo(p graphql.ResolveParams) (interface{}, error) {
	if card, ok := p.Source.(*data.RelationshipCard); ok {
		if memo := card.Memo; memo == nil {
			return nil, nil
		} else {
			return *memo, nil
		}
	}

	return nil, errors.New("not a RelationshipCard")
}

func resolveRelationshipCardIsFavourite(p graphql.ResolveParams) (interface{}, error) {
	if card, ok := p.Source.(*data.RelationshipCard); ok {
		return card.Favourite, nil
	}

	return nil, errors.New("not a RelationshipCard")
}

func resolveCreateRelationshipCard(p graphql.ResolveParams) (interface{}, error) {
	name, ok := p.Args[argName].(string)
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

func resolveUpdateRelationshipCardName(p graphql.ResolveParams) (interface{}, error) {
	id, ok := p.Args[argCardId].(string)
	if !ok {
		return nil, errors.New("failed to parse cardId arg")
	}
	desiredName, ok := p.Args[argName].(string)
	if !ok {
		return nil, errors.New("failed to parse name arg")
	}

	// Reload data on every mutation to ensure we are updating most recent version.
	// Particularly important for multiple mutations in a single request (which will be resolved in series).
	acct, err := data.Load()
	if err != nil {
		return nil, err
	}

	// Find the card to modify
	card := acct.FindRelationshipCard(id)
	if card == nil {
		return nil, errors.New("failed to find card with specified ID")
	}
	card.Name = desiredName

	err = data.Save(acct)
	if err != nil {
		return nil, err
	}

	return desiredName, nil
}

func resolveUpdateRelationshipCardMemo(p graphql.ResolveParams) (interface{}, error) {
	id, ok := p.Args[argCardId].(string)
	if !ok {
		return nil, errors.New("failed to parse cardId arg")
	}
	var deleteMemo bool
	var desiredMemo string
	if argMemo := p.Args[argMemo]; argMemo == nil {
		deleteMemo = true
	} else {
		desiredMemo, ok = argMemo.(string)
		if !ok {
			return nil, errors.New("failed to parse name arg")
		}
	}

	// Reload data on every mutation to ensure we are updating most recent version.
	// Particularly important for multiple mutations in a single request (which will be resolved in series).
	acct, err := data.Load()
	if err != nil {
		return nil, err
	}

	// Find the card to modify
	card := acct.FindRelationshipCard(id)
	if card == nil {
		return nil, errors.New("failed to find card with specified ID")
	}
	if deleteMemo {
		card.Memo = nil
	} else {
		card.Memo = &desiredMemo
	}

	err = data.Save(acct)
	if err != nil {
		return nil, err
	}

	if deleteMemo {
		return nil, nil
	} else {
		return desiredMemo, nil
	}
}

func resolveUpdateRelationshipCardIsFavourite(p graphql.ResolveParams) (interface{}, error) {
	id, ok := p.Args[argCardId].(string)
	if !ok {
		return nil, errors.New("failed to parse cardId arg")
	}
	favourite, ok := p.Args[argFavourite].(bool)
	if !ok {
		return nil, errors.New("failed to parse isFavourite arg")
	}

	// Reload data on every mutation to ensure we are updating most recent version.
	// Particularly important for multiple mutations in a single request (which will be resolved in series).
	acct, err := data.Load()
	if err != nil {
		return nil, err
	}

	// Find the card to modify
	card := acct.FindRelationshipCard(id)
	if card == nil {
		return nil, errors.New("failed to find card with specified ID")
	}
	card.Favourite = favourite

	err = data.Save(acct)
	if err != nil {
		return nil, err
	}

	return nil, nil
}
