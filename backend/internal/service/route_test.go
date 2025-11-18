package service

import (
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestHealthcheckRoute(t *testing.T) {
    svc, err := SetupService()
    if err != nil {
        t.Fatalf("SetupService error: %v", err)
    }

    w := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/healthcheck", nil)
    svc.router.ServeHTTP(w, req)

    if w.Code != http.StatusOK {
        t.Fatalf("expected 200 OK, got %d", w.Code)
    }
    if got := w.Body.String(); got == "" {
        t.Fatalf("expected JSON body, got empty")
    }
}

