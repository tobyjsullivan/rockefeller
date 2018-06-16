package data

var (
	fakeData = Account{
		RelationshipCards: []*RelationshipCard{
			{
				ID: "1761bc85-a964-4b99-92df-9762bceb0535",
				Name: "Ingrid A. Davis",
			},
			{
				ID: "85323c7f-5dcc-4e78-854e-570312c0ee8c",
				Name: "Fatinah Zahrah Baba",
			},
			{
				ID: "4a8dcd3c-8e96-48dc-a0d5-d31394fe785d",
				Name: "Jayden Chinner",
			},
			{
				ID: "6c2f3dc7-da6e-4c1f-9636-12ac2b8d18e0",
				Name: "Leonardo Barbosa Lima",
			},
			{
				ID: "ac8fdc53-876d-4a2b-90e3-0fbb8816359d",
				Name: "Kameta Dratchev",
			},
			{
				ID: "7087a311-9566-4cf1-83b6-663d955ea0b8",
				Name: "An Chiang",
			},
			{
				ID: "2b36f7a0-84fa-4cd7-8cc6-a4051a722098",
				Name: "Zoran Stanić",
			},
			{
				ID: "6c7c63aa-fe66-41ea-9725-92a988227d68",
				Name: "Božena Vanišová",
			},
			{
				ID: "19f65e6a-a05b-41f5-be40-64147b8b83c7",
				Name: "Nansen S. Pedersen",
			},
			{
				ID: "c5edbe0e-63b3-4fed-bca5-8dcc5683e254",
				Name: "Aster Verhagen",
			},
			{
				ID: "13f3d448-d9d6-4bac-bb7e-72760c2ad69c",
				Name: "Katie Alexander",
			},
			{
				ID: "36badf12-ffc4-4a04-a6fd-3bf37f30578b",
				Name: "Yorda Omar",
			},
		},
	}
)

type Account struct {
	RelationshipCards []*RelationshipCard `json:"relationshipCards"`
}

type RelationshipCard struct {
	ID string `json:"id"`
	Name string `json:"name"`
}

func Load() (*Account, error) {
	return &fakeData, nil
}
