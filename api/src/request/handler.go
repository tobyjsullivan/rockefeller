package request

import (
	"encoding/json"
	"net/http"

	"encoding/base64"
	"github.com/graphql-go/graphql"
	"log"
	"strings"
)

const ALLOWED_ORIGIN = "*"
const HEADER_ORIGIN = "origin"

type Request struct {
	Headers map[string]string
	Method  string
	Path    string
	Body    string
}

type Response struct {
	StatusCode int
	Headers    map[string]string
	Body       []byte
	BinaryData bool
}

type GraphApi interface {
	PerformQuery(string, map[string]interface{}) *graphql.Result
}

type Handler struct {
	graphApi GraphApi
}

func New(graphApi GraphApi) *Handler {
	return &Handler{
		graphApi: graphApi,
	}
}

type queryRequest struct {
	Query     string                 `json:"query"`
	Variables map[string]interface{} `json:"variables"`
}

type responseBody struct {
	Data   interface{} `json:"data"`
	Errors []string    `json:"errors"`
}

func (handler *Handler) Handle(req Request) (Response, error) {
	req.Headers = normaliseHeaders(req.Headers)

	log.Println("Request:", req.Method, req.Path)
	log.Println("Body:", base64.StdEncoding.EncodeToString([]byte(req.Body)))

	if req.Path != "/query" {
		return Response{
			StatusCode: http.StatusNotFound,
			Body:       []byte("Not Found"),
		}, nil
	}

	switch req.Method {
	case http.MethodPost:
		var queryRequest queryRequest
		err := json.Unmarshal([]byte(req.Body), &queryRequest)
		if err != nil {
			return generateApiResponse(http.StatusBadRequest, responseBody{Errors: []string{err.Error()}})
		}

		res, err := handler.handleGraphQuery(&queryRequest)
		if err != nil {
			return Response{}, err
		}

		corsHeaders := determineCorsHeaders(req)
		for k, v := range corsHeaders {
			res.Headers[k] = v
		}

		return res, nil
	case http.MethodOptions:
		return Response{
			StatusCode: http.StatusOK,
			Headers:    determineCorsHeaders(req),
			Body:       []byte(""),
			BinaryData: false,
		}, nil
	default:
		return Response{
			StatusCode: http.StatusMethodNotAllowed,
			Body:       []byte("Method Not Allowed"),
		}, nil
	}

}

func normaliseHeaders(in map[string]string) map[string]string {
	out := make(map[string]string)

	for k, v := range in {
		norm := strings.ToLower(k)
		out[norm] = v
	}

	return out
}

func determineCorsHeaders(req Request) map[string]string {
	origin, ok := req.Headers[HEADER_ORIGIN]
	if !ok || origin == "" {
		return map[string]string{}
	}

	if ALLOWED_ORIGIN != "*" && strings.ToLower(ALLOWED_ORIGIN) != strings.ToLower(origin) {
		return map[string]string{}
	}

	headers := make(map[string]string)

	switch req.Method {
	case http.MethodOptions:
		headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
		headers["Access-Control-Allow-Headers"] = "content-type"
		headers["Access-Control-Max-Age"] = "86400"
		fallthrough
	default:
		headers["Access-Control-Allow-origin"] = origin
	}

	return headers
}

func (handler *Handler) handleGraphQuery(query *queryRequest) (Response, error) {
	r := handler.graphApi.PerformQuery(query.Query, query.Variables)
	if len(r.Errors) > 0 {
		return generateApiResponse(http.StatusBadRequest, r)
	}

	return generateApiResponse(http.StatusOK, r)
}

func generateApiResponse(statusCode int, body interface{}) (Response, error) {
	if content, err := json.Marshal(body); err != nil {
		return Response{}, err
	} else {
		return Response{
			StatusCode: statusCode,
			Body:       content,
			Headers:    map[string]string{},
			BinaryData: false,
		}, nil
	}
}
