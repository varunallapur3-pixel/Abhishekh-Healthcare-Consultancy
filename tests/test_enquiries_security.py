import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath("backend"))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_public_cannot_read_enquiries():
    response = client.get("/api/enquiries")
    assert response.status_code == 405, f"Expected 405 Method Not Allowed, got {response.status_code}"
    print("[PASS] Public GET /api/enquiries blocked with 405 Method Not Allowed")

def test_public_cannot_modify_enquiries():
    response = client.put("/api/enquiries", json={"status": "modified"})
    assert response.status_code == 405, f"Expected 405, got {response.status_code}"

    response2 = client.patch("/api/enquiries", json={"status": "modified"})
    assert response2.status_code == 405, f"Expected 405, got {response2.status_code}"
    print("[PASS] Public PUT/PATCH /api/enquiries blocked with 405 Method Not Allowed")

def test_public_cannot_delete_enquiries():
    response = client.delete("/api/enquiries")
    assert response.status_code == 405, f"Expected 405, got {response.status_code}"
    print("[PASS] Public DELETE /api/enquiries blocked with 405 Method Not Allowed")

if __name__ == "__main__":
    test_public_cannot_read_enquiries()
    test_public_cannot_modify_enquiries()
    test_public_cannot_delete_enquiries()
    print("All backend enquiry access security checks PASSED.")
