import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_search_no_number(client):
    response = client.get('/api/search')
    assert response.status_code == 400
    assert response.json['status'] == 'error'
    assert 'Phone number is required' in response.json['message']

def test_search_invalid_format(client):
    response = client.get('/api/search?number=abcdef')
    assert response.status_code == 400
    assert response.json['status'] == 'error'
    assert 'Invalid phone number format' in response.json['message']

def test_search_invalid_number(client):
    # Valid format, invalid number
    response = client.get('/api/search?number=+1234567')
    assert response.status_code == 400
    assert response.json['status'] == 'error'
    assert 'not valid' in response.json['message']

def test_search_valid_number(client):
    # Example valid US number
    response = client.get('/api/search?number=+14155552671')
    assert response.status_code == 200
    assert response.json['status'] == 'success'

    result = response.json['result']
    assert result['valid'] == True
    assert result['country_code'] == '+1'
    assert result['region_code'] == 'US'
    assert 'CA' in result['region']
    assert 'international_format' in result
    assert 'national_format' in result

def test_rate_limiting(client):
    # Ensure rate limiting works (limit is 10 per minute)
    for _ in range(10):
        client.get('/api/search?number=+14155552671')

    response = client.get('/api/search?number=+14155552671')
    assert response.status_code == 429 # Too Many Requests
