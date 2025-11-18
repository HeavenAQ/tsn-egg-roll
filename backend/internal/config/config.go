package config

import "os"

type Config struct {
	Port string
}

func LoadConfigFromEnv() (config Config) {
	return Config{
		Port: os.Getenv("PORT"),
	}
}
