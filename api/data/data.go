package data

import (
	"./delta"
	"encoding/json"
	"io"
	"errors"
)

type Account struct {
	RelationshipCards       []*RelationshipCard `json:"relationshipCards"`
	idxIdToRelationshipCard map[string]*RelationshipCard
}

func NewAccount() *Account {
	acct := &Account{
		RelationshipCards: []*RelationshipCard{},
	}
	acct.buildIndex()
	return acct
}

func UnmarshalAccount(reader io.Reader, acct *Account) error {
	if acct == nil {
		return errors.New("target Account cannot be nil")
	}

	err := json.NewDecoder(reader).Decode(acct)
	if err == nil {
		acct.buildIndex()
	}
	return err
}

func (acct *Account) buildIndex() {
	acct.idxIdToRelationshipCard = make(map[string]*RelationshipCard)
	for _, card := range acct.RelationshipCards {
		acct.idxIdToRelationshipCard[card.ID] = card
	}
}

func (acct *Account) FindRelationshipCards() []*RelationshipCard {
	out := make([]*RelationshipCard, len(acct.RelationshipCards))
	copy(out, acct.RelationshipCards)
	return out
}

func (acct *Account) GetRelationshipCard(cardId string) *RelationshipCard {
	return acct.idxIdToRelationshipCard[cardId]
}

func (acct *Account) AddRelationshipCard(card *RelationshipCard) {
	acct.RelationshipCards = append(acct.RelationshipCards, card)
	acct.buildIndex()
}

func (acct *Account) RemoveRelationshipCard(cardId string) {
	newList := make([]*RelationshipCard, 0, len(acct.RelationshipCards)-1)
	for _, card := range acct.RelationshipCards {
		if card.ID != cardId {
			newList = append(newList, card)
		}
	}
	acct.RelationshipCards = newList
	acct.buildIndex()
}

type RelationshipCard struct {
	ID        string          `json:"id"`
	Name      string          `json:"name"`
	Favourite bool            `json:"favourite"`
	Memo      *string         `json:"memo"`
	Notes     *delta.Document `json:"notes"`
}
