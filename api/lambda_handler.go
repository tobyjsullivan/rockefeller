package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"./graph"
	"github.com/aws/aws-lambda-go/lambda"
)

type ApiEvent struct {
	Body       string `json:"body"`
	HttpMethod string `json:"httpMethod"`
	Path       string `json:"path"`
}

type QueryRequest struct {
	Query string `json:"query"`
}

type ApiResponse struct {
	StatusCode      int               `json:"statusCode"`
	Headers         map[string]string `json:"headers"`
	Body            interface{}       `json:"body"`
	IsBase64Encoded bool              `json:"isBase64Encoded"`
}

type ResponseBody struct {
	Data   interface{} `json:"data"`
	Errors []string    `json:"errors"`
}

func generateApiResponse(statusCode int, body interface{}) (ApiResponse, error) {
	if content, err := json.Marshal(body); err != nil {
		return ApiResponse{}, err
	} else {
		return ApiResponse{
			StatusCode:      statusCode,
			Body:            string(content),
			Headers:         map[string]string{},
			IsBase64Encoded: false,
		}, nil
	}
}

func HandleLambdaEvent(event ApiEvent) (ApiResponse, error) {
	log.Printf("Request path: %s\n", event.Path)
	log.Printf("Request method: %s\n", event.HttpMethod)
	log.Printf("Request body: %s\n", event.Body)

	if event.Path == "/query" && event.HttpMethod == http.MethodPost {
		var queryRequest QueryRequest
		err := json.Unmarshal([]byte(event.Body), &queryRequest)
		if err != nil {
			return generateApiResponse(http.StatusBadRequest, ResponseBody{Errors: []string{err.Error()}})
		}

		return handleGraphQuery(&queryRequest)
	}

	return ApiResponse{}, errors.New(fmt.Sprintf("Unexpected query: %s %s", event.HttpMethod, event.Path))
}

func handleGraphQuery(query *QueryRequest) (ApiResponse, error) {
	r := graph.PerformQuery(query.Query)
	if len(r.Errors) > 0 {
		return generateApiResponse(http.StatusBadRequest, r)
	}

	return generateApiResponse(http.StatusOK, r)
}

func main() {
	lambda.Start(HandleLambdaEvent)
}
