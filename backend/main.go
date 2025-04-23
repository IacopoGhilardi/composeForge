package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"gopkg.in/yaml.v3"
)

type Service struct {
	Name        string            `json:"name"`
	Image       string            `json:"image"`
	Build       BuildConfig       `json:"build"`
	Ports       []string          `json:"ports"`
	Environment map[string]string `json:"environment"`
	Volumes     []string          `json:"volumes"`
	Networks    []string          `json:"networks"`
	DependsOn   []string          `json:"depends_on"`
}

type BuildConfig struct {
	Context    string `json:"context"`
	Dockerfile string `json:"dockerfile"`
}

type DockerCompose struct {
	Version  string             `yaml:"version"`
	Services map[string]Service `yaml:"services"`
}

func generateHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var service Service
	if err := json.NewDecoder(r.Body).Decode(&service); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	compose := DockerCompose{
		Version: "3.8",
		Services: map[string]Service{
			service.Name: service,
		},
	}

	yamlData, err := yaml.Marshal(&compose)
	if err != nil {
		http.Error(w, "Failed to generate YAML", http.StatusInternalServerError)
		return
	}

	response := map[string]string{
		"config": string(yamlData),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/generate", generateHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
