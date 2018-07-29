package graph

import (
	"encoding/json"
	"errors"

	"../data"
	"../data/delta"
	"github.com/graphql-go/graphql"
)

func (api *API) resolveMe(p graphql.ResolveParams) (interface{}, error) {
	// Load data
	return api.data.Load()
}

func (api *API) resolveAccountRelationshipCards(p graphql.ResolveParams) (interface{}, error) {
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

	cards := account.FindRelationshipCards()
	var out []*data.RelationshipCard
	if filterOnFavourites {
		for _, card := range cards {
			if card.Favourite == includeFavourites {
				out = append(out, card)
			}
		}
	} else {
		out = cards
	}

	return out, nil
}

func (api *API) resolveRelationshipCardID(p graphql.ResolveParams) (interface{}, error) {
	if card, ok := p.Source.(*data.RelationshipCard); ok {
		return card.ID, nil
	}

	return nil, errors.New("not a RelationshipCard")
}

func (api *API) resolveRelationshipCardName(p graphql.ResolveParams) (interface{}, error) {
	if card, ok := p.Source.(*data.RelationshipCard); ok {
		return card.Name, nil
	}

	return nil, errors.New("not a RelationshipCard")
}

func (api *API) resolveRelationshipCardMemo(p graphql.ResolveParams) (interface{}, error) {
	if card, ok := p.Source.(*data.RelationshipCard); ok {
		if memo := card.Memo; memo == nil {
			return nil, nil
		} else {
			return *memo, nil
		}
	}

	return nil, errors.New("not a RelationshipCard")
}

func (api *API) resolveRelationshipCardIsFavourite(p graphql.ResolveParams) (interface{}, error) {
	if card, ok := p.Source.(*data.RelationshipCard); ok {
		return card.Favourite, nil
	}

	return nil, errors.New("not a RelationshipCard")
}

func (api *API) resolveRelationshipCardNotes(p graphql.ResolveParams) (interface{}, error) {
	if card, ok := p.Source.(*data.RelationshipCard); ok {
		notes := card.Notes
		if notes == nil {
			notes = delta.NewDocument()
		}

		return notes, nil
	}

	return nil, errors.New("not a RelationshipCard")
}

func (api *API) resolveDocumentDeltaJson(p graphql.ResolveParams) (interface{}, error) {
	if doc, ok := p.Source.(*delta.Document); ok {
		res, err := json.Marshal(doc)
		return string(res), err
	}

	return nil, errors.New("not a Document")
}
