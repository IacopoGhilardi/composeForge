package models

type ComposeData struct {
	Version  string
	Services []Service
	Networks []Network
}

type Network struct {
	Name   string
	Driver string
	Extras map[string]string
}

type Service struct {
	Name            string
	Image           string
	ContainerName   string
	EnvironmentVars []string
	Ports           []string
	Networks        []string
	DependsOn       []string
}
