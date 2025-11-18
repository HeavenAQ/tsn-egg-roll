package types

import "log"

type Logger struct {
	Info  *log.Logger
	Error *log.Logger
	Warn  *log.Logger
}
