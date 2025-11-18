package service

import (
	"fmt"
	"log"
	"os"

	"github.com/egg-roll-backend/internal/config"
	"github.com/fatih/color"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Service struct {
	config      config.Config
	router      *gin.Engine
	ErrorLogger *log.Logger
	InfoLogger  *log.Logger
	WarnLogger  *log.Logger
}

func (service *Service) Start() error {
	return service.router.Run(fmt.Sprintf(":%s", service.config.Port))
}

func (service *Service) setupLogger() {
	red := color.New(color.FgRed)
	cyan := color.New(color.FgCyan)
	yellow := color.New(color.FgYellow)

	service.ErrorLogger = log.New(os.Stderr, red.Sprint("[ERROR] "), log.Ldate|log.Ltime|log.Llongfile)
	service.InfoLogger = log.New(os.Stdout, cyan.Sprint("[INFO] "), log.Ldate|log.Ltime|log.Llongfile)
	service.WarnLogger = log.New(os.Stdout, yellow.Sprint("[WARN] "), log.Ldate|log.Ltime|log.Llongfile)
}

func SetupService() (*Service, error) {
	// setup router
	service := &Service{config: config.LoadConfigFromEnv()}
	service.router = gin.Default()
	service.router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	service.setupLogger()
	service.setupRoutes()
	return service, nil
}
