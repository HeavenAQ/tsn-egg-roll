package config

import (
    "os"
    "testing"
)

func TestLoadConfigFromEnv(t *testing.T) {
    // Save and restore
    origPort := os.Getenv("PORT")
    origKey := os.Getenv("STRIPE_SECRET_KEY")
    t.Cleanup(func() {
        os.Setenv("PORT", origPort)
        os.Setenv("STRIPE_SECRET_KEY", origKey)
    })

    os.Setenv("PORT", "8080")
    os.Setenv("STRIPE_SECRET_KEY", "sk_test_abc")

    cfg := LoadConfigFromEnv()
    if cfg.Port != "8080" {
        t.Fatalf("expected PORT 8080, got %s", cfg.Port)
    }
    if cfg.StripeKey != "sk_test_abc" {
        t.Fatalf("expected STRIPE_SECRET_KEY sk_test_abc, got %s", cfg.StripeKey)
    }
}

