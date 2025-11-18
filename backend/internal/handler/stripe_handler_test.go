package handler

import (
    "bytes"
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"

    "github.com/egg-roll-backend/internal/types"
    "github.com/gin-gonic/gin"
)

func setupRouterWithHandler() *gin.Engine {
    gin.SetMode(gin.TestMode)
    r := gin.Default()
    r.POST("/api/v1/payment/stripe/create-payment-intent", CreatePaymentIntent)
    return r
}

func TestCreatePaymentIntent_BadRequest(t *testing.T) {
    r := setupRouterWithHandler()

    w := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodPost, "/api/v1/payment/stripe/create-payment-intent", bytes.NewBufferString(`{"items":"invalid"}`))
    req.Header.Set("Content-Type", "application/json")

    r.ServeHTTP(w, req)

    if w.Code != http.StatusBadRequest {
        t.Fatalf("expected status 400, got %d", w.Code)
    }
}

func TestCreatePaymentIntent_OK(t *testing.T) {
    // Stub the dependency
    orig := createPaymentIntentClientID
    t.Cleanup(func() { createPaymentIntentClientID = orig })
    createPaymentIntentClientID = func(items []types.Item) (string, error) {
        return "cs_mocked_ok", nil
    }

    r := setupRouterWithHandler()

    body := CreatePaymentIntentRequest{
        Items: []types.Item{{ID: "item-1", Amount: 1234}},
    }
    b, _ := json.Marshal(body)

    w := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodPost, "/api/v1/payment/stripe/create-payment-intent", bytes.NewBuffer(b))
    req.Header.Set("Content-Type", "application/json")

    r.ServeHTTP(w, req)

    if w.Code != http.StatusOK {
        t.Fatalf("expected status 200, got %d", w.Code)
    }
    if !bytes.Contains(w.Body.Bytes(), []byte("cs_mocked_ok")) {
        t.Fatalf("expected response to contain client_secret cs_mocked_ok, got: %s", w.Body.String())
    }
}

