package main

import (
	"./request"
	"github.com/aws/aws-lambda-go/lambda"
	"encoding/base64"
)

type ApiEvent struct {
	Body       string `json:"body"`
	HttpMethod string `json:"httpMethod"`
	Path       string `json:"path"`
	Headers    map[string]string `json:"headers"`
}

type ApiResponse struct {
	StatusCode      int               `json:"statusCode"`
	Headers         map[string]string `json:"headers"`
	Body            interface{}       `json:"body"`
	IsBase64Encoded bool              `json:"isBase64Encoded"`
}

func HandleLambdaEvent(event ApiEvent) (ApiResponse, error) {
	res, err := request.Handle(request.Request{
		Method: event.HttpMethod,
		Path:   event.Path,
		Body:   event.Body,
		Headers: event.Headers,
	})

	if err != nil {
		return ApiResponse{}, err
	}

	var body string
	var isEncoded bool
	if res.BinaryData {
		body = base64.StdEncoding.EncodeToString(res.Body)
		isEncoded = true
	} else {
		body = string(res.Body)
		isEncoded = false
	}

	return ApiResponse{
		StatusCode:      res.StatusCode,
		Headers:         res.Headers,
		Body:            body,
		IsBase64Encoded: isEncoded,
	}, nil
}

func main() {
	lambda.Start(HandleLambdaEvent)
}
