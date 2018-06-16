package data

import (
	"bytes"
	"encoding/json"
	"log"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

var (
	dataBucket = os.Getenv("DATA_BUCKET")
	dataKey    = os.Getenv("DATA_KEY")
	s3Svc      = s3.New(session.Must(session.NewSession()))
)

type Account struct {
	RelationshipCards []*RelationshipCard `json:"relationshipCards"`
}

type RelationshipCard struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func Load() (*Account, error) {
	log.Printf("Fetching %s/%s", dataBucket, dataKey)
	out, err := s3Svc.GetObject(&s3.GetObjectInput{
		Bucket: aws.String(dataBucket),
		Key:    aws.String(dataKey),
	})

	var acct Account
	if err != nil {
		if awsErr, ok := err.(awserr.Error); ok && awsErr.Code() == "AccessDenied" {
			// Create the data file
			acct = Account{
				RelationshipCards: []*RelationshipCard{},
			}

			Save(&acct)
		} else {
			log.Fatalf("Error fetching data file: %v", err)
		}
	} else {
		err = json.NewDecoder(out.Body).Decode(&acct)
		if err != nil {
			log.Fatalf("Error decoding data file: %v", err)
		}
	}

	return &acct, nil
}

func Save(account *Account) error {
	body, err := json.Marshal(&account)
	if err != nil {
		log.Fatalf("Error serializing new data file: %v", err)
	}

	_, err = s3Svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(dataBucket),
		Key:    aws.String(dataKey),
		Body:   bytes.NewReader(body),
	})

	return err
}
