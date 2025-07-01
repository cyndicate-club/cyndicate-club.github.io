Got it. I’ll write an expanded explanation of the two integration methods—Feed (Pull) and API Push (Webhook)—highlighting their characteristics and use cases. I’ll also note that for Feed sync, price updates should still be sent via the webhook to ensure investor data is always up to date.

# Integration Methods

We support two main ways to synchronize data between your system and ours, each with its own workflow and characteristics:

## Feed (Pull) Synchronization

* **How it works:** You publish a complete JSON “feed” file (for example, at `https://your-domain.com/rwa-feed.json`) that lists **all active assets** and their fields. Our system’s integration robot regularly fetches (pulls) this file on a fixed schedule (e.g. once per day). The JSON feed must contain every asset and all its properties so our database can be fully updated or rebuilt from that snapshot. This is a **one-way, batch** process: our system reads the feed and applies every record (creating new assets or updating/deleting existing ones) to match the feed’s contents.

* **Advantages:** This approach is simple and reliable for bulk updates. By providing a full snapshot each time, you ensure our records completely reflect your data (no incremental logic needed). A scheduled feed naturally handles large data sets in one go. In many synchronization systems, a pull-based feed can guarantee ordered, replayable updates (so if a sync fails you can re-pull the data). It’s also easy to implement on your end – just host the JSON file at a known URL with public or authenticated access, and our system handles the rest.

* **Considerations:** Because the feed only updates on schedule, data can become stale between fetches. Frequent or time-sensitive changes (like price fluctuations) won’t appear until the next pull. To keep fast-changing data current for investors, we **recommend** using a push mechanism for those fields. For example, update prices via our dedicated API/webhook instead of waiting for the next feed. This ensures real-time price accuracy for investors.

* **Use cases:** Feed synchronization is great for complete snapshots or bulk updates. It works well if your system prefers a nightly/daily batch process, or if you don’t have an event-driven setup. It’s particularly useful for initial imports, nightly reconciliations, or systems that cannot easily call our API.

## API Push (Webhook) Synchronization

* **How it works:** Your system actively **pushes** updates to us via HTTP requests whenever something changes. For example, when a new asset is added or an existing one changes, your software makes an HTTP `POST` or `PUT` call (with the asset’s JSON) to our REST API endpoint (e.g. `https://our-portal.com/api/assets`). This is an **event-driven** (webhook) approach: data flows from you to us as soon as events occur, without waiting for us to poll your system.

* **Advantages:** Webhooks provide near real-time updates. As soon as a change happens in your system, you notify us immediately. This minimizes latency and keeps our records up-to-date for investors and other clients. Push updates also eliminate the need for our system to repeatedly poll your data (saving resources). As Zapier notes, “Webhooks don’t require much ‘talking’ — data flows in one direction”, meaning once you send an update, no further back-and-forth is needed. They are lightweight and efficient: they carry just the data about the change (you decide exactly what to send), which is ideal for notifying us of specific events. In practice, webhooks reduce constant polling; instead of us asking every few minutes, your system tells us only when something important happens.

* **Considerations:** Webhooks require your system to reliably send data on every event. You should handle retries or monitoring in case requests fail (e.g. network issues). Because each webhook carries only the changed asset (or event data), there is less built-in context than a full feed. Also, webhooks typically do not guarantee ordering or replay. If a webhook delivery is missed and not retried, that update can be lost. Therefore, design your integration so each push is idempotent and contains enough information to apply the update correctly. For example, always include a unique asset ID and all fields that need updating.

* **Use cases:** Webhooks are ideal for any situation where you want instant synchronization. Examples include creating a new asset, marking an asset as inactive, or making a high-impact change (like a legal status update) that investors should see right away. Because webhooks handle events one at a time, they work well for unpredictable or bursty updates (new data entering the system sporadically). They are also useful when data changes frequently and you want to avoid the delay of a scheduled feed.

## Using Both Methods Together

You can combine both approaches for maximum flexibility. For instance, you might run a daily full data pull via the Feed to catch any missed updates and ensure consistency, **and** also push critical changes or new assets via the API as they occur. This hybrid approach uses the feed as a reliable batch sync (an audit/passive backup) and webhooks for immediacy.

* **Pricing Updates:** In particular, use a dedicated API/webhook for price updates. Frequent price changes (market data, valuation updates, etc.) should be sent through our pricing endpoint or pushed via webhook rather than waiting for the next feed cycle. This way, investors always see the latest prices.

By understanding the trade-offs, you can choose the right method (or mix) for your needs. Pull feeds give you simple, complete snapshots on a schedule, while webhooks let you keep data current in real time. Combining them ensures robust and up-to-date integration.

**Sources:** Industry best practices highlight these differences – for example, the Zapier guide on APIs vs. Webhooks emphasizes that webhooks are “push-based” and one-way, while Sync Gateway documentation contrasts pull feeds (sequential and replayable) with push webhooks (unordered, non-replayable). ServiceNow documentation similarly notes that webhooks suit event-triggered, lightweight notifications to avoid polling. These illustrate why each method has its own use cases and benefits.
