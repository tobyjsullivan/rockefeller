package graph

import (
	"../data"
	"../data/delta"
	"testing"
	"encoding/json"
	"fmt"
	"reflect"
)

type FakeData struct {}

func (store *FakeData) Load() (*data.Account, error) {
	acct := data.NewAccount()
	acct.AddRelationshipCard(&data.RelationshipCard{
		ID: "b55e1ee5-726c-441e-ab71-a04883981a12",
		Name: "Stefano Ferrari",
		Favourite: false,
		Memo: nil,
		Notes: delta.NewDocument(),
	})
	return acct, nil
}

func (store *FakeData) Save(*data.Account) error {
	return nil
}

func TestAPI_PerformQuery(t *testing.T) {
	api := New(&FakeData{})
	query := `
{
  me {
    favourites: relationshipCards(favourite: true) {
      ...relationshipCardFields
    }
    relationshipCards {
      ...relationshipCardFields
    }
  }
}

fragment relationshipCardFields on RelationshipCard {
  id
  name
  memo
  isFavourite
	notes {
		deltaJson
	}
}
`
	res := api.PerformQuery(query, map[string]interface{}{})

	if res.HasErrors() {
		t.Fatalf("Unexpected errors: %v", res.Errors)
	}

	// Marshal the response to evaluate
	bytes, err := json.Marshal(res.Data)
	if err != nil {
		t.Fatalf("Marshalling error: %s", err)
	}

	expected := `
{
	"me":{
		"favourites":[],
		"relationshipCards":[
			{
				"id":"b55e1ee5-726c-441e-ab71-a04883981a12",
				"isFavourite":false,
				"memo":null,
				"name":"Stefano Ferrari",
				"notes":{
					"deltaJson":"{\"operations\":[]}"
				}
			}
		]
	}
}`
	eq, err := equalJson(expected, string(bytes))
	if err != nil {
		t.Fatalf("Comparison error: %s", err)
	}
	if !eq {
		t.Fatalf("Unexpected data: %s", bytes)
	}
}

// Copied from https://gist.github.com/turtlemonvh/e4f7404e28387fadb8ad275a99596f67
func equalJson(s1, s2 string) (bool, error) {
	var o1 interface{}
	var o2 interface{}

	var err error
	err = json.Unmarshal([]byte(s1), &o1)
	if err != nil {
		return false, fmt.Errorf("error mashalling string 1 :: %s", err.Error())
	}
	err = json.Unmarshal([]byte(s2), &o2)
	if err != nil {
		return false, fmt.Errorf("error mashalling string 2 :: %s", err.Error())
	}

	return reflect.DeepEqual(o1, o2), nil
}
