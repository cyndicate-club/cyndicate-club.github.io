# API Endpoints

## Authentication

All API endpoints require HTTP Basic authentication. Include credentials in the `Authorization` header:

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

Always use HTTPS to protect credentials in transit.

## Asset Data Endpoints

### Pull Method (GET Feed)

**Your Responsibility**: Provide a URL where we can fetch your JSON feed

```http
GET https://your-domain.com/property-feed.json
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

**Response Format**:
```json
{
  "assets": [
    {
      "id": "ABC123",
      "name": "Property Name",
      "provider": "YourPlatform",
      // ... other asset fields
    }
  ]
}
```

### Push Method (POST Asset)

**Our Endpoint**: We provide an endpoint for you to push data

```http
POST https://api.cyndicate.club/assets
Content-Type: application/json
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=

{
  "id": "ABC123",
  "name": "Property Name",
  "provider": "YourPlatform",
  // ... other asset fields
}
```

**Response**:
- `200 OK` - Asset successfully created/updated
- `400 Bad Request` - Invalid data format
- `401 Unauthorized` - Authentication failed
- `422 Unprocessable Entity` - Validation errors

## Price Update Endpoint

For real-time token price changes:

```http
POST https://api.cyndicate.club/assets/{id}/update_price
Content-Type: application/json
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=

{
  "token_price": 205.50,
  "property_price": 1027500
}
```

**Parameters**:
- `{id}` - The unique asset identifier
- `token_price` - New price per token
- `property_price` - New total property value (optional, calculated if not provided)

## Batch Operations

### Multiple Assets (Push)

Send multiple assets in a single request:

```http
POST https://api.cyndicate.club/assets/batch
Content-Type: application/json
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=

{
  "assets": [
    {
      "id": "ABC123",
      "name": "Property 1",
      // ... fields
    },
    {
      "id": "DEF456", 
      "name": "Property 2",
      // ... fields
    }
  ]
}
```

### Bulk Price Updates

Update multiple asset prices:

```http
POST https://api.cyndicate.club/assets/update_prices
Content-Type: application/json
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=

{
  "updates": [
    {
      "id": "ABC123",
      "token_price": 205.50
    },
    {
      "id": "DEF456",
      "token_price": 150.00
    }
  ]
}
```

## Asset Status Management

### Deactivate Asset

Mark an asset as inactive:

```http
POST https://api.cyndicate.club/assets/{id}/deactivate
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

### Reactivate Asset

Mark an asset as active again:

```http
POST https://api.cyndicate.club/assets/{id}/activate
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

## Error Responses

### Validation Error Response

```json
{
  "success": false,
  "errors": [
    {
      "asset_id": "ABC123",
      "field": "token_price",
      "message": "Token price must be a positive number",
      "received_value": -10
    }
  ]
}
```

### Authentication Error

```json
{
  "success": false,
  "error": "Authentication failed",
  "message": "Invalid username or password"
}
```

