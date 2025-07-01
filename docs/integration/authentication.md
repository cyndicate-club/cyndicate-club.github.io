# Authentication

## Overview

For external systems providing property data to Cyndicate Club, we use HTTP Basic Authentication. This is used when:

1. **Our robot fetches data** from your endpoints (HTTPS only)
2. **You send data** to our webhook endpoints

## Getting Credentials

To obtain your integration credentials:

- **Contact Support**: Email us at `integration-support@cyndicate.club`
- **Through Your Manager**: Contact your assigned account manager
- **During Onboarding**: Credentials are provided during the integration setup process

You will receive:
- **Username**: Unique identifier for your integration
- **Password**: Secure password for authentication
- **Endpoint URLs**: Our API endpoints for data submission

⚠️ **Important**: Our data fetching robot **only works with HTTPS**. HTTP endpoints will be rejected for security reasons.

## HTTP Basic Authentication

### How It Works

HTTP Basic Authentication sends credentials in the `Authorization` header:

```http
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

Where `dXNlcm5hbWU6cGFzc3dvcmQ=` is base64 encoding of `username:password`

### Setting Up Your Endpoint

You need to protect your data endpoint with Basic Auth. Here's a simple example:

#### Node.js Example
```javascript
const express = require('express');
const app = express();

app.use('/properties.json', (req, res, next) => {
  const auth = req.headers.authorization;
  
  if (!auth || !auth.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const credentials = Buffer.from(auth.slice(6), 'base64').toString();
  const [username, password] = credentials.split(':');
  
  // Check your username and password
  if (username === 'your_username' && password === 'your_password') {
    next();
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/properties.json', (req, res) => {
  res.json({
    "properties": [
      // Your property data here
    ]
  });
});
```

#### Python Example
```python
from flask import Flask, request, jsonify
import base64

app = Flask(__name__)

@app.route('/properties.json')
def get_properties():
    auth = request.headers.get('Authorization')
    
    if not auth or not auth.startswith('Basic '):
        return jsonify({'error': 'Authentication required'}), 401
    
    try:
        credentials = base64.b64decode(auth[6:]).decode('utf-8')
        username, password = credentials.split(':', 1)
    except:
        return jsonify({'error': 'Invalid authorization header'}), 401
    
    # Check your username and password
    if username == 'your_username' and password == 'your_password':
        return jsonify({
            "properties": [
                # Your property data here
            ]
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401
```

## Requirements

- **HTTPS only** - Our robot exclusively works with HTTPS endpoints. HTTP will not work
- **Valid SSL certificate** - Your HTTPS endpoint must have a valid SSL certificate
- **Strong password** - At least 12 characters with mixed case, numbers, symbols
- **Unique credentials** - Don't reuse passwords from other systems
- **Credential security** - Store credentials securely and never expose them in logs or version control

## Testing

Test your endpoint with curl:

```bash
# Test with correct credentials
curl -u "your_username:your_password" https://your-domain.com/properties.json

# Test with wrong credentials (should return 401)
curl -u "wrong:password" https://your-domain.com/properties.json
```

## Common Errors

<dl>
<dt><strong>401 Unauthorized</strong></dt>
<dd>Wrong username/password - Check credentials</dd>

<dt><strong>400 Bad Request</strong></dt>
<dd>Invalid auth header - Fix authorization format</dd>

<dt><strong>403 Forbidden</strong></dt>
<dd>Correct credentials but no access - Check permissions</dd>
</dl>

 