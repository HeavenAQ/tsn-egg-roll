package handler

import (
	"os"

	"github.com/gin-gonic/gin"
)

func CreateCheckoutSession(c *gin.Context) {
}

func RetrieveCheckoutSession(c *gin.Context) {
}

func CreatePaymentIntent(c *gin.Context) {
	os.Getenv("")
}
