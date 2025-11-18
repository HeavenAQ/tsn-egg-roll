package main

import (
	"log"

	"github.com/egg-roll-backend/internal/service"
)

func main() {
	service, err := service.SetupService()
	if err != nil {
		log.Panic("Failed to spin up service")
	}

	if err := service.Start(); err != nil {
		service.Logger.Error.Fatalf("failed to run server: %v", err)
	}

	service.Logger.Info.Println("Server starts running")
}
