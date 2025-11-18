package api

import (
    "github.com/egg-roll-backend/internal/types"
    "github.com/stripe/stripe-go/v83"
    "github.com/stripe/stripe-go/v83/paymentintent"
)

// paymentIntentNew allows tests to override the Stripe client call.
var paymentIntentNew = paymentintent.New

func calculateOrderAmount(items []types.Item) int64 {
	total := int64(0)
	for _, item := range items {
		total += item.Amount
	}
	return total
}

func CreatePaymentIntentClientID(items []types.Item) (string, error) {
	// Create payment intent parameters
	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(calculateOrderAmount(items)),
		Currency: stripe.String(string(stripe.CurrencyJPY)),
		AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
			Enabled: stripe.Bool(true),
		},
	}

    pi, err := paymentIntentNew(params)
    if err != nil {
        return "", err
    }

	return pi.ClientSecret, nil
}
