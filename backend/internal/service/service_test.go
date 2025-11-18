package service

import (
    "os"
    "testing"

    "github.com/stripe/stripe-go/v83"
)

func TestSetupService_SetsStripeKey(t *testing.T) {
    // Save and restore env
    origPort := os.Getenv("PORT")
    origKey := os.Getenv("STRIPE_SECRET_KEY")
    t.Cleanup(func() {
        os.Setenv("PORT", origPort)
        os.Setenv("STRIPE_SECRET_KEY", origKey)
    })

    os.Setenv("PORT", "8080")
    os.Setenv("STRIPE_SECRET_KEY", "sk_test_from_env")

    svc, err := SetupService()
    if err != nil {
        t.Fatalf("SetupService returned error: %v", err)
    }
    if svc == nil {
        t.Fatalf("service is nil")
    }

    if stripe.Key != "sk_test_from_env" {
        t.Fatalf("expected stripe.Key to be sk_test_from_env, got %s", stripe.Key)
    }
}

