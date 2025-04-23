package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/iacopoghilardi/composeforge/api/v1/services"
	"github.com/iacopoghilardi/composeforge/models"
	"github.com/iacopoghilardi/composeforge/utils"
)

func HandleParse(res http.ResponseWriter, req *http.Request) {
	var composeData models.ComposeData
	err := json.NewDecoder(req.Body).Decode(&composeData)
	if err != nil {
		http.Error(res, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// composeData := models.ComposeData{
	// 	Version: "3.8",
	// 	Services: []models.Service{
	// 		{
	// 			Name:          "app",
	// 			Image:         "myapp:latest",
	// 			ContainerName: "myapp-container",
	// 			EnvironmentVars: []string{
	// 				"ENV=production",
	// 				"DEBUG=false",
	// 			},
	// 			Ports:    []string{"8080:80"},
	// 			Networks: []string{"default"},
	// 		},
	// 		{
	// 			Name:          "app2",
	// 			Image:         "myapp:latest",
	// 			ContainerName: "myapp-container",
	// 			EnvironmentVars: []string{
	// 				"ENV=production",
	// 				"DEBUG=false",
	// 			},
	// 			Ports:     []string{"8080:80"},
	// 			Networks:  []string{"default"},
	// 			DependsOn: []string{"app"},
	// 		},
	// 		// Altri servizi se vuoi...
	// 	},
	// 	Networks: []models.Network{
	// 		{
	// 			Name:   "network1",
	// 			Driver: "Stronzo",
	// 		},
	// 	},
	// }

	result, err := services.RenderTemplateToString(composeData)
	if err != nil {
		http.Error(res, "Template rendering error", http.StatusInternalServerError)
		return
	}

	utils.WriteJSONResponse(res, http.StatusOK, map[string]string{
		"content": result,
	})
}
