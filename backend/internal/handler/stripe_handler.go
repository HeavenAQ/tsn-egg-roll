package handler

import (
    "net/http"

    "github.com/egg-roll-backend/api"
    "github.com/egg-roll-backend/internal/types"
    "github.com/gin-gonic/gin"
)

// createPaymentIntentClientID allows tests to stub the payment intent creation.
var createPaymentIntentClientID = api.CreatePaymentIntentClientID

func CreateCheckoutSession(c *gin.Context) {
}

func RetrieveCheckoutSession(c *gin.Context) {
}

type CreatePaymentIntentRequest struct {
	Items []types.Item `json:"items" binding:"required"`
}

type CreatePaymentIntentResponse struct {
	ClientSecret string `json:"client_secret"`
}

func CreatePaymentIntent(c *gin.Context) {
    var req CreatePaymentIntentRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    clientSecret, err := createPaymentIntentClientID(req.Items)
    if err != nil {
        c.JSON(http.StatusExpectationFailed, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, CreatePaymentIntentResponse{
        ClientSecret: clientSecret,
    })
}
