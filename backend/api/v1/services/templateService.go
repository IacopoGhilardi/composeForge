package services

import (
	"bytes"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"runtime"

	"github.com/iacopoghilardi/composeforge/models"
)

var (
	_, b, _, _ = runtime.Caller(0)
	RootPath   = filepath.Join(filepath.Dir(b), "../../../../")
)

func WriteAndCreateFile() {
	file, err := os.Create("./docker-compose.yml")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	data := models.ComposeData{
		Version: "3.8",
		Services: []models.Service{
			{
				Name:          "app",
				Image:         "myapp:latest",
				ContainerName: "myapp-container",
				EnvironmentVars: []string{
					"ENV=production",
					"DEBUG=false",
				},
				Ports:    []string{"8080:80"},
				Networks: []string{"default"},
			},
			{
				Name:          "app2",
				Image:         "myapp:latest",
				ContainerName: "myapp-container",
				EnvironmentVars: []string{
					"ENV=production",
					"DEBUG=false",
				},
				Ports:     []string{"8080:80"},
				Networks:  []string{"default"},
				DependsOn: []string{"app"},
			},
			// Altri servizi se vuoi...
		},
		Networks: []models.Network{
			{
				Name:   "network1",
				Driver: "Stronzo",
			},
		},
	}

	tmpl, err := ParseFileTemplate()
	if err != nil {
		panic(err)
	}
	err = tmpl.Execute(file, data)
	if err != nil {
		panic(err)
	}
}

func ParseFileTemplate() (*template.Template, error) {
	//Carico tutti i template dentro la mia cartella
	templatesPath := RootPath + "/backend/templates/*"

	//Parso tutto
	tmpl, err := template.ParseGlob(templatesPath)
	if err != nil {
		fmt.Println("Error while retrieving template")
		panic(err)
	}

	return tmpl, nil
}

func RenderTemplateToString(data models.ComposeData) (string, error) {
	var buf bytes.Buffer

	tmpl, err := ParseFileTemplate()
	if err != nil {
		return "", err
	}

	err = tmpl.Execute(&buf, data)
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}
