# Error Codes

## Common HTTP Status Codes

| Code | Status | Description | What to do |
|------|--------|-------------|------------|
| **200** | OK | Request successful | Nothing - all good |
| **400** | Bad Request | Invalid data format | Check your JSON format |
| **401** | Unauthorized | Authentication failed | Check username/password |
| **422** | Validation Error | Data validation failed | Fix the data fields |
| **500** | Server Error | Our server error | Contact support |

## Property Data Validation Errors

### Basic Information

| Error Code | Field | Problem | Solution |
|------------|-------|---------|----------|
| **PROP_001** | `id` | Property ID missing | Add unique property ID |
| **PROP_002** | `id` | ID already exists | Use different ID |
| **PROP_003** | `title` | Title missing | Add property title |
| **PROP_004** | `title` | Title too short/long | Use 10-200 characters |

### Location

| Error Code | Field | Problem | Solution |
|------------|-------|---------|----------|
| **PROP_101** | `location.country` | Country code missing | Add country code (US, CA, etc.) |
| **PROP_102** | `location.country` | Invalid country code | Use ISO format (US, GB, DE) |
| **PROP_103** | `location.city` | City missing | Add city name |

### Property Details

| Error Code | Field | Problem | Solution |
|------------|-------|---------|----------|
| **PROP_201** | `property_type` | Type missing | Use: apartment, house, commercial, land |
| **PROP_202** | `property_type` | Invalid type | Use allowed types only |
| **PROP_203** | `status` | Status missing | Use: active, inactive, sold_out |

### Financial Data

| Error Code | Field | Problem | Solution |
|------------|-------|---------|----------|
| **PROP_301** | `total_value` | Value missing | Add total value in USD |
| **PROP_302** | `total_value` | Value must be positive | Use number > 0 |
| **PROP_304** | `available_tokens` | Tokens missing | Add token count |
| **PROP_306** | `token_price` | Price missing | Add price per token |
| **PROP_308** | `token_price` | Math doesn't match | total_value = tokens × price |

### Images

| Error Code | Field | Problem | Solution |
|------------|-------|---------|----------|
| **PROP_402** | `images` | Invalid URL | Use valid HTTPS URLs |
| **PROP_403** | `images` | Can't access image | Make sure image is public |
| **PROP_404** | `images` | Wrong format | Use JPG, PNG, or WebP |
| **PROP_405** | `images` | File too big | Max 5MB per image |

## Example Error Response

When validation fails, you'll get a response like this:

```json
{
  "success": false,
  "errors": [
    {
      "property_id": "property_001",
      "error_code": "PROP_001",
      "field": "id",
      "message": "Property ID missing"
    },
    {
      "property_id": "property_002", 
      "error_code": "PROP_004",
      "field": "title",
      "message": "Title too short/long",
      "received_value": "Hi"
    }
  ]
}
```

## How to Fix Common Problems

### Data Format Issues
- **Problem**: JSON format is invalid
- **Solution**: Use a JSON validator to check your data
- **Tool**: https://jsonlint.com

### Missing Required Fields  
- **Problem**: PROP_001, PROP_003, PROP_101 errors
- **Solution**: Check our required fields list and add missing data

### Image Problems
- **Problem**: PROP_402, PROP_403, PROP_405 errors  
- **Solution**: 
  - Use HTTPS URLs only
  - Make images publicly accessible
  - Keep images under 5MB
  - Use JPG, PNG, or WebP formats

### Token Math Errors
- **Problem**: PROP_308 error
- **Solution**: Make sure `total_value = available_tokens × token_price`

 