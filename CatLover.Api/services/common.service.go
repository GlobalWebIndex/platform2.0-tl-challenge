package services

import (
	"catlover.api/models"
)

func ReturnResponse(status string, code int32, message string, data interface{}) models.Response {
	var response = models.Response{
		Status:  status,
		Code:    code,
		Message: message,
		Data:    data,
	}
	return response
}
