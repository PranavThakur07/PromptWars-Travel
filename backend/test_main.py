from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_generate_endpoint_validation():
    # Send empty body to test that validation works (should return 422 Unprocessable Entity)
    response = client.post("/api/generate", json={})
    assert response.status_code == 422
