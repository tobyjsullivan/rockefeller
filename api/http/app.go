package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"../graph"
	"../request"
	"../s3data"
)

var (
	dataBucket = os.Getenv("DATA_BUCKET")
	dataKey    = os.Getenv("DATA_KEY")
)

type graphRequestHandler interface {
	Handle(request.Request) (request.Response, error)
}

type httpRequestHandler struct {
	graphHandler graphRequestHandler
}

func (h *httpRequestHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	content, err := ioutil.ReadAll(r.Body)
	r.Body.Close()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	headers := make(map[string]string)
	for k, v := range r.Header {
		for _, cur := range v {
			// Note: Only preserves last value for any header
			headers[k] = cur
		}
	}

	res, err := h.graphHandler.Handle(request.Request{
		Method:  r.Method,
		Path:    r.URL.Path,
		Body:    string(content),
		Headers: headers,
	})

	for k, v := range res.Headers {
		w.Header().Set(k, v)
	}

	w.WriteHeader(res.StatusCode)
	w.Write(res.Body)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	handler := &httpRequestHandler{
		graphHandler: request.New(graph.New(s3data.New(dataBucket, dataKey))),
	}

	log.Println("Running on " + port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
