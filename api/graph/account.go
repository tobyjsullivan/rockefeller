package graph

import (
	"encoding/json"
	"errors"

	"../data"
	"../data/delta"
	"github.com/graphql-go/graphql"
)

var (
	documentType = graphql.NewObject(graphql.ObjectConfig{
		Name: "Document",
		Fields: graphql.Fields{
			"deltaJson": &graphql.Field{
				Type:    graphql.NewNonNull(graphql.String),
				Resolve: resolveDocumentDeltaJson,
			},
		},
	})

	relationshipCardType = graphql.NewObject(graphql.ObjectConfig{
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
			"notes": &graphql.Field{
				Type:    graphql.NewNonNull(documentType),
				Resolve: resolveRelationshipCardNotes,
			},
		},
	})

	accountType = graphql.NewObject(graphql.ObjectConfig{
		Name: "Account",
		Fields: graphql.Fields{
			"relationshipCards": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(relationshipCardType))),
				Args: graphql.FieldConfigArgument{
					argFavourite: &graphql.ArgumentConfig{
						Type: graphql.Boolean,
					},
				},
				Resolve: resolveAccountRelationshipCards,
			},
		},
	})
)

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

func resolveRelationshipCardNotes(p graphql.ResolveParams) (interface{}, error) {
	if card, ok := p.Source.(*data.RelationshipCard); ok {
		notes := card.Notes
		if notes == nil {
			notes = delta.NewDocument()
		}

		return notes, nil
	}

	return nil, errors.New("not a RelationshipCard")
}

func resolveDocumentDeltaJson(p graphql.ResolveParams) (interface{}, error) {
	if doc, ok := p.Source.(*delta.Document); ok {
		res, err := json.Marshal(doc)
		return string(res), err
	}

	return nil, errors.New("not a Document")
}
