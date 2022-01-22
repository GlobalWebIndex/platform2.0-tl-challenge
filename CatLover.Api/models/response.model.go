package models

type Response struct {
	Status  string      `json:"status"`
	Code    int32       `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}
