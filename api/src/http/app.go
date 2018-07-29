package main

import (
	"net/http"
	"os"
	"log"
	"io/ioutil"

	"../request"
)

type handler struct{}

func (h *handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

	res, err := request.Handle(request.Request{
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

	log.Println("Running on " + port)
	log.Fatal(http.ListenAndServe(":"+port, &handler{}))
}
