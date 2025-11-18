package types

type Item struct {
	ID     string `json:"id" binding:"required"`
	Amount int64  `json:"amount" binding:"required"`
}
