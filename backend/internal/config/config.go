package config

import "os"

type Config struct {
	Port      string
	StripeKey string
}

func LoadConfigFromEnv() (config Config) {
	return Config{
		Port:      os.Getenv("PORT"),
		StripeKey: os.Getenv("STRIPE_SECRET_KEY"),
	}
}
