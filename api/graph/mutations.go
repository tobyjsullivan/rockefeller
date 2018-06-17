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

var (
	mutationType = graphql.NewObject(graphql.ObjectConfig{
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
				Type:        graphql.Boolean,
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
			"replaceRelationshipCardNotes": &graphql.Field{
				Type: graphql.String,
				Args: graphql.FieldConfigArgument{
					argCardId: &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.ID),
					},
					argDeltaJson: &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: resolveReplaceRelationshipCardNotes,
			},
		},
	})
)

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

	return favourite, nil
}

func resolveReplaceRelationshipCardNotes(p graphql.ResolveParams) (interface{}, error) {
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
	acct, err := data.Load()
	if err != nil {
		return nil, err
	}

	// Find the card to modify
	card := acct.FindRelationshipCard(id)
	if card == nil {
		return nil, errors.New("failed to find card with specified ID")
	}
	card.Notes = &notes

	err = data.Save(acct)
	if err != nil {
		return nil, err
	}

	res, err := json.Marshal(&notes)
	return string(res), err
}
