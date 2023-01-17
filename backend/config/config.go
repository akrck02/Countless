package config

import "os"

type Config struct {
	HOST   string `json:"host"`
	PORT   string `json:"port"`
	DB     string `json:"database"`
	SECRET string `json:"secret"`
}

// static private port
const DEFAULT_HOST = "127.0.0.1"
const DEFAULT_PORT = "8029"
const DEFAULT_DB = "countless"
const DATABASE_EXTENSION = ".db"

func LoadConfig() Config {

	config := Config{
		HOST:   os.Getenv("HOST"),
		PORT:   os.Getenv("PORT"),
		DB:     os.Getenv("DB"),
		SECRET: os.Getenv("SECRET"),
	}

	if config.HOST == "" {
		config.HOST = DEFAULT_HOST
	}

	if config.PORT == "" {
		config.PORT = DEFAULT_PORT
	}

	if config.DB == "" {
		config.DB = DEFAULT_DB
	}

	config.DB = DATABASE_STORAGE + "" + config.DB + "" + DATABASE_EXTENSION
	return config
}
