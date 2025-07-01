# Data Schema and Asset Fields

All asset data is exchanged in JSON format. Each property (asset) is represented by a JSON object with the following fields. The field names below should match your JSON keys exactly.

## Required Fields

* **id** (string or integer): A unique identifier for the asset (e.g. your internal asset ID or ticker). This must match across updates.
* **name** (string): Asset name or title.
* **provider** (string): Your company/platform name. Must match one of the registered providers in our system.
* **property_price** (number): Total price of the property (currency units).
* **token_price** (number): Price per token (currency units).
* **tokens_total** (integer): Total number of tokens issued.

## Optional Fields

* **description** (string): Full text description of the property.
* **deal_type** (array of strings): Transaction type(s), e.g. `["sale","lease"]`.
* **address** (string): Property address (street, city, etc.).
* **country** (string): Country code or name (from standard list).
* **url** (string): A public URL for the property listing or details page.
* **projected_rental_yield** (number): Expected annual rental yield (%). Lofty AI's documentation, for example, defines projected rental yield as the expected cash-flow return on capital.
* **projected_appreciation** (number): Expected annual appreciation (%). Lofty defines this as the estimated value increase over one year.
* **yield_distribution** (string): Schedule (e.g. `"monthly"`, `"quarterly"`, `"yearly"`).
* **yield_start_date** (string, ISO date): Date when yield payouts start (e.g. `"2025-08-01"`).
* **risk** (string): Risk category (e.g. `"Low"`, `"Medium"`, `"High"`).
* **token_type** (string): The token standard (e.g. `"ERC-20"`, `"NFT"`, `"Security"`).
* **network** (string): Blockchain network (e.g. `"Ethereum"`, `"Polygon"`).
* **smart_contract_url** (string): URL to the on-chain contract (e.g. an Etherscan link).
* **tokens_sold** (integer): Number of tokens already sold.
* **tokens_available** (integer): Number of tokens remaining (usually auto-calculated as `tokens_total - tokens_sold`).
* **comments** (string): Any additional notes or comments (free text).
* **about_property** (string): "About this property" (long text).
* **specifications** (string): Property specifications/details (long text).
* **amenities** (string): Amenities or features (long text).
* **rental_history** (string): Past rental history or performance (long text).
* **investment_model** (string): Investment model description (long text).
* **deal_structure** (string): Structure of the deal (long text).

## Validation Rules

* **Token Economics**: `property_price` should equal `token_price * tokens_total`
* **Risk Values**: Must be one of "Low", "Medium", "High"
* **Date Format**: Use ISO 8601 format (e.g. "2025-08-01")
* **URLs**: Must be valid HTTPS URLs
* **Country**: Use standard country codes or names

## Example Asset Object

```json
{
  "id": "ABC123",
  "name": "Oceanfront Condo",
  "provider": "YourPlatform",
  "description": "Luxury 2-bed condo with sea view.",
  "deal_type": ["sale"],
  "address": "123 Beach Road, Miami, FL",
  "country": "USA",
  "url": "https://yourplatform.com/listing/ABC123",
  "projected_rental_yield": 8.5,
  "projected_appreciation": 5.0,
  "yield_distribution": "monthly",
  "yield_start_date": "2025-09-01",
  "risk": "Medium",
  "token_type": "ERC-20",
  "network": "Ethereum",
  "smart_contract_url": "https://etherscan.io/address/0xABC...",
  "property_price": 1000000,
  "token_price": 200,
  "tokens_total": 5000,
  "tokens_sold": 1500,
  "tokens_available": 3500,
  "comments": "Initial offering",
  "about_property": "Built in 2020, has modern amenities...",
  "specifications": "2 beds, 2 baths, 1500 sqft",
  "amenities": "Pool, Gym, Parking",
  "rental_history": "Vacant until lease in 2023",
  "investment_model": "Equity stake via token",
  "deal_structure": "Fixed-rate crowdfunding"
}
```

## Feed Format

For the pull method, wrap all assets in a JSON array:

```json
{
  "assets": [
    {
      "id": "ABC123",
      "name": "Oceanfront Condo",
      // ... other fields
    },
    {
      "id": "DEF456", 
      "name": "Downtown Office",
      // ... other fields
    }
  ]
}
``` 