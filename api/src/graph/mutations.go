package graph

import (
	"encoding/json"
	"errors"

	"../data"
	"../data/delta"
	"github.com/graphql-go/graphql"
	"github.com/satori/go.uuid"
)

const (
	argCardId    = "cardId"
	argName      = "name"
	argMemo      = "memo"
	argFavourite = "favourite"
	argDeltaJson = "deltaJson"
)

func (api *API) resolveCreateRelationshipCard(p graphql.ResolveParams) (interface{}, error) {
	name, ok := p.Args[argName].(string)
	if !ok {
		return nil, errors.New("failed to parse name arg")
	}

	// Reload data on every mutation to ensure we are updating most recent version.
	// Particularly important for multiple mutations in a single request (which will be resolved in series).
	acct, err := api.data.Load()
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
	acct.AddRelationshipCard(card)

	err = api.data.Save(acct)
	if err != nil {
		return nil, err
	}

	return card, nil
}

func (api *API) resolveUpdateRelationshipCardName(p graphql.ResolveParams) (interface{}, error) {
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
	acct, err := api.data.Load()
	if err != nil {
		return nil, err
	}

	// Find the card to modify
	card := acct.GetRelationshipCard(id)
	if card == nil {
		return nil, errors.New("failed to find card with specified ID")
	}
	card.Name = desiredName

	err = api.data.Save(acct)
	if err != nil {
		return nil, err
	}

	return desiredName, nil
}

func (api *API) resolveUpdateRelationshipCardMemo(p graphql.ResolveParams) (interface{}, error) {
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
	acct, err := api.data.Load()
	if err != nil {
		return nil, err
	}

	// Find the card to modify
	card := acct.GetRelationshipCard(id)
	if card == nil {
		return nil, errors.New("failed to find card with specified ID")
	}
	if deleteMemo {
		card.Memo = nil
	} else {
		card.Memo = &desiredMemo
	}

	err = api.data.Save(acct)
	if err != nil {
		return nil, err
	}

	if deleteMemo {
		return nil, nil
	} else {
		return desiredMemo, nil
	}
}

func (api *API) resolveUpdateRelationshipCardIsFavourite(p graphql.ResolveParams) (interface{}, error) {
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
	acct, err := api.data.Load()
	if err != nil {
		return nil, err
	}

	// Find the card to modify
	card := acct.GetRelationshipCard(id)
	if card == nil {
		return nil, errors.New("failed to find card with specified ID")
	}
	card.Favourite = favourite

	err = api.data.Save(acct)
	if err != nil {
		return nil, err
	}

	return favourite, nil
}

func (api *API) resolveReplaceRelationshipCardNotes(p graphql.ResolveParams) (interface{}, error) {
	id, ok := p.Args[argCardId].(string)
	if !ok {
		return nil, errors.New("failed to parse cardId arg")
	}
	var notes delta.Document
	if rawNotes, ok := p.Args[argDeltaJson].(string); !ok {
		return nil, errors.New("failed to parse notes arg")
	} else if err := json.Unmarshal([]byte(rawNotes), &notes); err != nil {
		return nil, err
	}

	// Reload data on every mutation to ensure we are updating most recent version.
	// Particularly important for multiple mutations in a single request (which will be resolved in series).
	acct, err := api.data.Load()
	if err != nil {
		return nil, err
	}

	// Find the card to modify
	card := acct.GetRelationshipCard(id)
	if card == nil {
		return nil, errors.New("failed to find card with specified ID")
	}
	card.Notes = &notes

	err = api.data.Save(acct)
	if err != nil {
		return nil, err
	}

	res, err := json.Marshal(&notes)
	return string(res), err
}

func (api *API) resolveDeleteRelationshipCard(p graphql.ResolveParams) (interface{}, error) {
	id, ok := p.Args[argCardId].(string)
	if !ok {
		return nil, errors.New("failed to parse cardId arg")
	}

	// Reload data on every mutation to ensure we are updating most recent version.
	// Particularly important for multiple mutations in a single request (which will be resolved in series).
	acct, err := api.data.Load()
	if err != nil {
		return nil, err
	}

	acct.RemoveRelationshipCard(id)

	err = api.data.Save(acct)
	return err == nil, err
}
