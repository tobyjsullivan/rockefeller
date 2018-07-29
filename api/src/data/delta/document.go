package delta

const (
	ListTypeUnordered = "UNORDERED"
	ListTypeOrdered   = "ORDERED"
)

type Document struct {
	Operations []*Operation `json:"operations"`
}

// Represents a single operation. Exactly one of Insert, Retain, or Delete should be present.
type Operation struct {
	Insert *InsertOperation `json:"insert,omitempty"`
	Retain *RetainOperation `json:"retain,omitempty"`
	Delete *DeleteOperation `json:"delete,omitempty"`
}

type InsertOperation struct {
	Content    string      `json:"content"`
	Attributes *Attributes `json:"attributes,omitempty"`
}

type RetainOperation struct {
	Length     int         `json:"length"`
	Attributes *Attributes `json:"attributes,omitempty"`
}

type DeleteOperation struct {
	Length int `json:"length"`
}

type RelationshipCardId string

type Attributes struct {
	Emphasis         *bool               `json:"emphasis,omitempty"`
	Strong           *bool               `json:"strong,omitempty"`
	ListType         *string             `json:"listType,omitempty"`
	ListLevel        *int                `json:"listLevel,omitempty"`
	HeadingLevel     *int                `json:"headingLevel,omitempty"`
	RelationshipCard *RelationshipCardId `json:"relationshipCard,omitempty"`
}

func NewDocument() *Document {
	return &Document{
		Operations: []*Operation{},
	}
}
