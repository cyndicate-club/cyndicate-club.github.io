# RWA RealEstate Data Integration Guide

This document describes how real-estate providers can integrate their tokenized property data with the RWA RealEstate portal. Providers have two integration options: a **scheduled feed pull** or an **on-demand API push**. In the pull model, our system periodically fetches a JSON feed from your server (similar to Yandex Market's product feed process). In the push model, you send data directly to our API (acting like a webhook). In both cases, data is transferred over HTTPS with HTTP Basic authentication (username/password). A separate endpoint is used for updating token prices, so price changes can be pushed immediately without waiting for the daily feed.

## Authentication and Access

All API endpoints (both feed and push) require HTTP Basic authentication. You will be given a username and password for the integration; include them in the `Authorization` header of each request. For example, the credentials "`username:password`" are Base64‑encoded and sent as:

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=  
```

This is the standard way to authenticate API requests. Always use HTTPS to protect credentials in transit.

## Integration Methods

We support **two synchronization methods**:

* **Feed (Pull)**: You publish a JSON file (e.g. `https://your-domain.com/rwa-feed.json`) containing all active assets. Our system's robot fetches this file on a fixed schedule (e.g. daily). The JSON must include every property (asset) and its fields, so it can fully update our database. This is a one-way, batch process: our system reads your data and updates or creates records accordingly.
* **API Push (Webhook)**: You send data to our REST API endpoints as HTTP requests. For example, to add or update a property, you might `POST` the asset JSON to `https://our-portal.com/api/assets`. This is ideal for sending updates as events occur. Webhooks "don't require much 'talking' — data flows in one direction" from your system to ours.

You can use **both** methods simultaneously. For example, you might do a daily pull of all assets (batch feed) and also push critical updates (like new assets or large data changes) via API. However, **price updates should use the dedicated price endpoint** (see below) rather than the main asset feed, so that frequent price changes can be handled separately.

## Data Format and Asset Fields

All asset data is exchanged in JSON format. Each property (asset) is represented by a JSON object with the following fields. The field names below should match your JSON keys exactly. Types and requirements:

* **id** (string or integer): A unique identifier for the asset (e.g. your internal asset ID or ticker). This must match across updates.

* **name** (string): Asset name or title.

* **provider** (string): Your company/platform name. Must match one of the registered providers in our system.

* **description** (string): Full text description of the property.

* **deal\_type** (array of strings): Transaction type(s), e.g. `["sale","lease"]`.

* **address** (string): Property address (street, city, etc.).

* **country** (string): Country code or name (from standard list).

* **url** (string): A public URL for the property listing or details page.

* **projected\_rental\_yield** (number): Expected annual rental yield (%). Lofty AI's documentation, for example, defines projected rental yield as the expected cash-flow return on capital.

* **projected\_appreciation** (number): Expected annual appreciation (%). Lofty defines this as the estimated value increase over one year.

* **yield\_distribution** (string): Schedule (e.g. `"monthly"`, `"quarterly"`, `"yearly"`).

* **yield\_start\_date** (string, ISO date): Date when yield payouts start (e.g. `"2025-08-01"`).

* **risk** (string): Risk category (e.g. `"Low"`, `"Medium"`, `"High"`).

* **token\_type** (string): The token standard (e.g. `"ERC-20"`, `"NFT"`, `"Security"`).

* **network** (string): Blockchain network (e.g. `"Ethereum"`, `"Polygon"`).

* **smart\_contract\_url** (string): URL to the on-chain contract (e.g. an Etherscan link).

* **property\_price** (number): Total price of the property (currency units). Lofty's guide notes *"Total Investment = Token Price × Total Tokens"*, so this should equal `token_price * total_tokens`.

* **token\_price** (number): Price per token (currency units).

* **tokens\_total** (integer): Total number of tokens issued.

* **tokens\_sold** (integer): Number of tokens already sold.

* **tokens\_available** (integer): Number of tokens remaining (usually auto-calculated as `tokens_total - tokens_sold`).

* **comments** (string): Any additional notes or comments (free text).

* **about\_property** (string): "About this property" (long text).

* **specifications** (string): Property specifications/details (long text).

* **amenities** (string): Amenities or features (long text).

* **rental\_history** (string): Past rental history or performance (long text).

* **investment\_model** (string): Investment model description (long text).

* **deal\_structure** (string): Structure of the deal (long text).

Each JSON asset object should include **all relevant fields** above. Use appropriate JSON types (strings, numbers, arrays). For dropdown values (e.g. risk, network), make sure to use the exact terms expected. For example, risk is typically one of Low/Medium/High.

*For example*, a property might look like:

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

Lofty AI's public documentation shows similar fields in their investment summary (e.g. total price, token price, total tokens). That guide defines **Projected Rental Yield** and **Projected Appreciation** exactly as above. These examples can help ensure you use consistent meanings.

## API Endpoints

* **Asset Data Endpoint**:

  * *Pull (GET feed)*: Provide a URL where we can fetch the JSON feed (HTTP GET). Our system will authenticate via Basic Auth and download the JSON array of all assets.
  * *Push (POST asset)*: We will provide an endpoint (e.g. `POST /api/assets`) where you can send one or multiple asset objects. The body is JSON, and the `Content-Type: application/json` header must be set. Each POST should include the asset fields above; if the asset ID already exists, the record will be updated.

* **Price Update Endpoint**:
  Prices change often, so we handle them separately. A dedicated endpoint (e.g. `POST /api/assets/{id}/update_price`) allows you to push just the price update. The JSON body should include:

  ```json
  { "token_price": <newPrice>, "property_price": <newTotal> }
  ```

  or similar. Using this webhook means as soon as your system updates a price, it calls our API. Webhooks like this are designed for one-way, event-driven updates. If you prefer, you may also include updated prices in your daily JSON feed, but **it's recommended to use the webhook for real-time price changes**, so that investors always see the latest token price without delay.

## Scheduling and Updates

* **Feed Schedule**: We will fetch the full JSON feed **daily** (or at another agreed interval). Each fetch should return the complete set of current assets. If an asset no longer exists, it should be omitted or marked inactive in the feed. We treat the feed as a batch update: after fetching, we reconcile our database to match your feed. Because the entire dataset is retrieved each time, incremental/delta updates are not needed in the feed; just send the current state of every asset. (In our testing, large feeds can be split into pages or returned as chunks if needed, but a single JSON file is simplest.)
* **Push Notifications**: Besides the regular feed, you may push assets or updates via the API at any time. For example, when a new property is listed or a major detail changes, you can immediately `POST` that asset JSON to our API to apply the change. Use the price webhook (above) for price changes.

In short, we prefer **batch mode** with a daily feed of all assets (full catalog refresh). This matches common marketplace patterns (e.g. Yandex Market's daily product feed). It's simpler on our side because we replace or update all assets wholesale. You should plan your system to generate a fresh JSON of all items each day (even unchanged ones).

## Error Handling and Validation

When our system consumes your data, it will validate formats and types. If required fields are missing or invalid (e.g. non-numeric price), the asset may be rejected. For feed pulls, we will log any errors. For API pushes, the server will respond with HTTP 200 OK on success, or an error code (4xx/5xx) with a message on failure. When using webhooks, note that if the JSON is not correctly formatted, you might only see a simple HTTP status code (like 404). It's therefore important to thoroughly test your integration and ensure the payload matches exactly the schema above.

## Additional Notes

* **Asset Identification**: Each asset must have a unique ID. Use a consistent ID (same every time) so that updates apply to the correct record. RWA's own guide requires you to claim or create assets by name/ticker before syncing data; in our system, providing the ID in your feed will link to that asset.
* **Completeness**: Please provide as much data as possible. In RWA's experience, assets with complete profiles attract more investors. The extra descriptive fields (amenities, rental history, etc.) are optional but highly recommended for transparency.
* **Provider Registration**: Ensure your "Provider" name is already registered in our portal (we handle that separately). If not, let us know so we can add it.
* **Testing**: Start by sending a small set of assets to the API and verifying they appear correctly on our end. Then move to the full daily feed.

This integration ensures your real estate listings and token data stay in sync with our portal. By following the steps above, providers can "push" updates when needed and/or allow our system to "pull" the latest data automatically. This two-pronged approach—batch JSON feed plus real-time webhooks—is a common pattern (APIs for constant data vs. webhooks for event notifications). With this setup, all required fields (as listed) will be kept current in our system.

**Sources:** Our procedures follow standard API and webhook practices. RWA's onboarding documentation similarly recommends using an API for high-volume asset onboarding and sending recurring metrics via their ingestion API. Real-estate token examples (from Lofty.ai) illustrate how fields like total price, token price, and yields should behave. All communication is secured via HTTP Basic auth as described by RFCs. 