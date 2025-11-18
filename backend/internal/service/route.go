package service

import (
	"net/http"

	"github.com/egg-roll-backend/internal/handler"
	"github.com/gin-gonic/gin"
)

func (service *Service) setupRoutes() {
	// set up healthcheck
	service.router.GET("/healthcheck", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	// set up 404
	// Define the custom 404 handler using NoRoute
	service.router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "404 Not Found - The requested resource could not be found.",
			"path":    c.Request.URL.Path,
		})
	})

	// setup router groups
	api := service.router.Group("/api")
	setupV1Routes(api)
}

func setupV1Routes(api *gin.RouterGroup) {
	v1 := api.Group("/v1")
	setupV1AuthRoutes(v1)
	setupV1PaymentRoutes(v1)
}

func setupV1AuthRoutes(v1 *gin.RouterGroup) {
	auth := v1.Group("/auth")
	auth.GET("/google")
}

func setupV1PaymentRoutes(v1 *gin.RouterGroup) {
	payment := v1.Group("/payment")
	setupV1StripeRoutes(payment)
}

func setupV1StripeRoutes(payment *gin.RouterGroup) {
	stripe := payment.Group("/stripe")
	stripe.POST("/create-payment-intent", handler.CreatePaymentIntent)
}
