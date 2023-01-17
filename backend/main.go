package main

import (
	"os"

	"github.com/akrck02/countless/config"
	"github.com/akrck02/countless/services"
	"github.com/akrck02/countless/utils"
)

func main() {

	logger := utils.Logger
	configuration := config.LoadConfig()

	if configuration.SECRET == "" {
		logger.Error("Secret is not set, exiting...")
		os.Exit(1)
	}

	services.Start(configuration, logger)

}
