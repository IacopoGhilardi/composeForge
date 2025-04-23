package main

import (
	"fmt"
	"net/http"

	"github.com/iacopoghilardi/composeforge/api/v1/routes"
)

var DEFAULT_PORT = "9000"

func main() {
	fmt.Println("Ciao sono il main di questo distretto")

	router := routes.InitRouter()

	fmt.Println("Server start on port: " + DEFAULT_PORT)
	err := http.ListenAndServe(":"+DEFAULT_PORT, router)
	if err != nil {
		fmt.Println("Errore: ", err)
		panic(err)
	}
}
