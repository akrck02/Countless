package services

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type pingResponse struct {
	Message string `json:"message"`
}

/**
 * Status check endpoint
 */
func Ping(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, pingResponse{Message: "pong"})
}
