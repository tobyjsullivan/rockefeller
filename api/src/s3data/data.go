package s3data

import (
	"bytes"
	"encoding/json"
	"log"

	"../data"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

type Store struct {
	bucket string
	key    string
	svc    *s3.S3
}

func New(bucket, key string) *Store {
	return &Store{
		bucket: bucket,
		key:    key,
		svc:    s3.New(session.Must(session.NewSession())),
	}
}

func (store *Store) Load() (*data.Account, error) {
	log.Printf("Fetching %s/%s", store.bucket, store.key)
	out, err := store.svc.GetObject(&s3.GetObjectInput{
		Bucket: aws.String(store.bucket),
		Key:    aws.String(store.key),
	})

	var acct data.Account
	if err != nil {
		if awsErr, ok := err.(awserr.Error); ok && awsErr.Code() == "AccessDenied" {
			log.Println("Creating new data file.")
			acct = *data.NewAccount()

			store.Save(&acct)
		} else {
			log.Fatalf("Error fetching data file: %v", err)
		}
	} else {
		err = data.UnmarshalAccount(out.Body, &acct)
		if err != nil {
			log.Fatalf("Error decoding data file: %v", err)
		}
	}

	log.Println("Fetched data.")
	return &acct, nil
}

func (store *Store) Save(account *data.Account) error {
	body, err := json.Marshal(&account)
	if err != nil {
		log.Fatalf("Error serializing new data file: %v", err)
	}

	_, err = store.svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(store.bucket),
		Key:    aws.String(store.key),
		Body:   bytes.NewReader(body),
	})

	return err
}
