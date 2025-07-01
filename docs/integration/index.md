# Overview

Welcome to the Cyndicate Club integration documentation. This guide helps real estate providers synchronize their tokenized property data with our portal.

## Quick Start

1. **[Authentication](./authentication.md)** - Set up HTTP Basic authentication
2. **[Data Schema](./data-schema.md)** - Understand the required data format
3. **[API Endpoints](./api-endpoints.md)** - Learn about available endpoints
4. **[Scheduling & Updates](./scheduling-updates.md)** - Choose your sync strategy

# Integration Methods

We support two main ways to synchronize data between your system and ours, each with its own workflow and characteristics:

## Feed (Pull) Synchronization

**How it works:** You publish a complete JSON “feed” file (for example, at `https://your-domain.com/rwa-feed.json`) that lists **all active assets** and their fields. Our system’s integration robot regularly fetches (pulls) this file on a fixed schedule (e.g. once per day). The JSON feed must contain every asset and all its properties so our database can be fully updated or rebuilt from that snapshot. This is a **one-way, batch** process: our system reads the feed and applies every record (creating new assets or updating/deleting existing ones) to match the feed’s contents.

**Advantages:** This approach is simple and reliable for bulk updates. By providing a full snapshot each time, you ensure our records completely reflect your data (no incremental logic needed). A scheduled feed naturally handles large data sets in one go. In many synchronization systems, a pull-based feed can guarantee ordered, replayable updates (so if a sync fails you can re-pull the data). It’s also easy to implement on your end – just host the JSON file at a known URL with public or authenticated access, and our system handles the rest.

**Considerations:** Because the feed only updates on schedule, data can become stale between fetches. Frequent or time-sensitive changes (like price fluctuations) won’t appear until the next pull. To keep fast-changing data current for investors, we **recommend** using a push mechanism for those fields. For example, update prices via our dedicated API/webhook instead of waiting for the next feed. This ensures real-time price accuracy for investors.

**Use cases:** Feed synchronization is great for complete snapshots or bulk updates. It works well if your system prefers a nightly/daily batch process, or if you don’t have an event-driven setup. It’s particularly useful for initial imports, nightly reconciliations, or systems that cannot easily call our API.

## API Push (Webhook) Synchronization

**How it works:** Your system actively **pushes** updates to us via HTTP requests whenever something changes. For example, when a new asset is added or an existing one changes, your software makes an HTTP `POST` or `PUT` call (with the asset’s JSON) to our REST API endpoint (e.g. `https://api.cyndicate.club/assets`). This is an **event-driven** (webhook) approach: data flows from you to us as soon as events occur, without waiting for us to poll your system.

**Advantages:** Webhooks provide near real-time updates. As soon as a change happens in your system, you notify us immediately. This minimizes latency and keeps our records up-to-date for investors and other clients. Push updates also eliminate the need for our system to repeatedly poll your data (saving resources). In practice, webhooks reduce constant polling; instead of us asking every few minutes, your system tells us only when something important happens.

**Use cases:** Webhooks are ideal for any situation where you want instant synchronization. Examples include creating a new asset, marking an asset as inactive, or making a high-impact change (like a legal status update) that investors should see right away. Because webhooks handle events one at a time, they work well for unpredictable or bursty updates (new data entering the system sporadically). They are also useful when data changes frequently and you want to avoid the delay of a scheduled feed.

## Using Both Methods Together

You can combine both approaches for maximum flexibility. For instance, you might run a daily full data pull via the **Feed** to catch any missed updates and ensure consistency, and also push critical changes or new assets via the API as they occur. This hybrid approach uses the feed as a reliable batch sync (an audit/passive backup) and webhooks for immediacy.

**Pricing Updates:** In particular, use a dedicated API/webhook for price updates. Frequent price changes (market data, valuation updates, etc.) should be sent through our pricing endpoint or pushed via webhook rather than waiting for the next feed cycle. This way, investors always see the latest prices.






## Getting Started

1. **Contact us** to get your integration credentials
2. **Review the [data schema](./data-schema.md)** to understand required fields
3. **Choose your integration method** (feed pull or API push)
4. **Implement authentication** using our [authentication guide](./authentication.md)
5. **Test your integration** using our validation endpoints
6. **Go live** with scheduled feeds or real-time pushes

## Support

- **Technical Questions**: integration-support@cyndicate.club
- **Account Setup**: accounts@cyndicate.club



 