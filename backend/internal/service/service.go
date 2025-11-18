package service

import (
	"fmt"
	"log"
	"os"

	"github.com/egg-roll-backend/internal/config"
	"github.com/egg-roll-backend/internal/types"
	"github.com/fatih/color"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v83"
)

type Service struct {
	config config.Config
	router *gin.Engine
	Logger *types.Logger
}

func (service *Service) Start() error {
	return service.router.Run(fmt.Sprintf(":%s", service.config.Port))
}

func (service *Service) setupRouter() {
	service.router = gin.Default()
	service.router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
}

func (service *Service) setupLogger() {
	red := color.New(color.FgRed)
	cyan := color.New(color.FgCyan)
	yellow := color.New(color.FgYellow)

	service.Logger = &types.Logger{
		Info:  log.New(os.Stdout, cyan.Sprint("[INFO] "), log.Ldate|log.Ltime|log.Llongfile),
		Error: log.New(os.Stderr, red.Sprint("[ERROR] "), log.Ldate|log.Ltime|log.Llongfile),
		Warn:  log.New(os.Stdout, yellow.Sprint("[WARN] "), log.Ldate|log.Ltime|log.Llongfile),
	}
}

func SetupService() (*Service, error) {
	// set up service
	service := &Service{config: config.LoadConfigFromEnv()}
	service.setupLogger()
	service.setupRouter()
	service.setupRoutes()

	// set up stripe
	stripe.Key = service.config.StripeKey
	return service, nil
}
