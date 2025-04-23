package routes

import (
	"net/http"

	"github.com/iacopoghilardi/composeforge/api/v1/handlers"
	"github.com/iacopoghilardi/composeforge/api/v1/services"
	"github.com/iacopoghilardi/composeforge/utils"
)

func InitRouter() *http.ServeMux {
	router := http.NewServeMux()

	dockerRouter := http.NewServeMux()
	dockerRouter.HandleFunc("GET /generate", func(w http.ResponseWriter, r *http.Request) {
		services.WriteAndCreateFile()
		utils.WriteJSONResponse(w, http.StatusOK, "File created")
	})
	dockerRouter.HandleFunc("POST /parse", handlers.HandleParse)

	router.Handle("/docker/", http.StripPrefix("/docker", dockerRouter))
	return router
}
