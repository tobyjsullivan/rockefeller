package graph

import (
	"github.com/graphql-go/graphql"
)

func createSchema(api *API) (graphql.Schema, error) {
	documentType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Document",
		Fields: graphql.Fields{
			"deltaJson": &graphql.Field{
				Type:    graphql.NewNonNull(graphql.String),
				Resolve: api.resolveDocumentDeltaJson,
			},
		},
	})

	relationshipCardType := graphql.NewObject(graphql.ObjectConfig{
		Name: "RelationshipCard",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type:    graphql.NewNonNull(graphql.ID),
				Resolve: api.resolveRelationshipCardID,
			},
			"name": &graphql.Field{
				Type:    graphql.NewNonNull(graphql.String),
				Resolve: api.resolveRelationshipCardName,
			},
			"memo": &graphql.Field{
				Type:    graphql.String,
				Resolve: api.resolveRelationshipCardMemo,
			},
			"isFavourite": &graphql.Field{
				Type:    graphql.Boolean,
				Resolve: api.resolveRelationshipCardIsFavourite,
			},
			"notes": &graphql.Field{
				Type:    graphql.NewNonNull(documentType),
				Resolve: api.resolveRelationshipCardNotes,
			},
		},
	})

	accountType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Account",
		Fields: graphql.Fields{
			"relationshipCards": &graphql.Field{
				Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(relationshipCardType))),
				Args: graphql.FieldConfigArgument{
					argFavourite: &graphql.ArgumentConfig{
						Type: graphql.Boolean,
					},
				},
				Resolve: api.resolveAccountRelationshipCards,
			},
		},
	})

	queryType := graphql.NewObject(graphql.ObjectConfig{
		Name: "RootQuery",
		Fields: graphql.Fields{
			"me": &graphql.Field{
				Type:    accountType,
				Resolve: api.resolveMe,
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
				Resolve: api.resolveCreateRelationshipCard,
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
				Resolve: api.resolveUpdateRelationshipCardName,
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
				Resolve: api.resolveUpdateRelationshipCardMemo,
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
				Resolve: api.resolveUpdateRelationshipCardIsFavourite,
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
				Resolve: api.resolveReplaceRelationshipCardNotes,
			},
			"deleteRelationshipCard": &graphql.Field{
				Type: graphql.Boolean,
				Args: graphql.FieldConfigArgument{
					argCardId: &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.ID),
					},
				},
				Resolve: api.resolveDeleteRelationshipCard,
			},
		},
	})

	schemaConfig := graphql.SchemaConfig{
		Query:    queryType,
		Mutation: mutationType,
	}

	return graphql.NewSchema(schemaConfig)
}
