package main

import (
	"./graph"
	"./request"
	"./s3data"
	"github.com/aws/aws-lambda-go/lambda"
	"encoding/base64"
	"os"
)

var (
	dataBucket = os.Getenv("DATA_BUCKET")
	dataKey    = os.Getenv("DATA_KEY")
)

type ApiEvent struct {
	Body       string            `json:"body"`
	HttpMethod string            `json:"httpMethod"`
	Path       string            `json:"path"`
	Headers    map[string]string `json:"headers"`
}

type ApiResponse struct {
	StatusCode      int               `json:"statusCode"`
	Headers         map[string]string `json:"headers"`
	Body            interface{}       `json:"body"`
	IsBase64Encoded bool              `json:"isBase64Encoded"`
}

type graphRequestHandler interface {
	Handle(request.Request) (request.Response, error)
}

type lambdaRequestHandler struct {
	graphHandler graphRequestHandler
}

func (lh *lambdaRequestHandler) HandleLambdaEvent(event ApiEvent) (ApiResponse, error) {
	res, err := lh.graphHandler.Handle(request.Request{
		Method:  event.HttpMethod,
		Path:    event.Path,
		Body:    event.Body,
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
	lambdaHandler := &lambdaRequestHandler{
		graphHandler: request.New(graph.New(s3data.New(dataBucket, dataKey))),
	}
	lambda.Start(lambdaHandler.HandleLambdaEvent)
}
