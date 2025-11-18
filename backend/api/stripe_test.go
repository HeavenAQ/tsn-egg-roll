package api

import (
    "testing"

    "github.com/egg-roll-backend/internal/types"
    "github.com/stripe/stripe-go/v83"
)

func TestCalculateOrderAmount(t *testing.T) {
    items := []types.Item{{ID: "a", Amount: 100}, {ID: "b", Amount: 250}}
    got := calculateOrderAmount(items)
    if got != 350 {
        t.Fatalf("expected 350, got %d", got)
    }
}

func TestCreatePaymentIntentClientID_Mocked(t *testing.T) {
    // Save and restore original
    orig := paymentIntentNew
    t.Cleanup(func() { paymentIntentNew = orig })

    // Mock Stripe call
    paymentIntentNew = func(params *stripe.PaymentIntentParams) (*stripe.PaymentIntent, error) {
        return &stripe.PaymentIntent{ClientSecret: "cs_test_123"}, nil
    }

    cs, err := CreatePaymentIntentClientID([]types.Item{{ID: "x", Amount: 1}})
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
    if cs != "cs_test_123" {
        t.Fatalf("expected client secret cs_test_123, got %s", cs)
    }
}

