# Feed Scheduling and Updates

We will fetch the full JSON feed **daily** (or at another agreed interval). Each fetch should return the complete set of current assets. If an asset no longer exists, it should be omitted or marked inactive in the feed. We treat the feed as a batch update: after fetching, we reconcile our database to match your feed. Because the entire dataset is retrieved each time, incremental/delta updates are not needed in the feed; just send the current state of every asset.

### Default Schedule
- **Frequency**: Once per day
- **Timeout**: 30 seconds per request
- **Retries**: 3 attempts with exponential backoff (30 seconds between attempts)

Available frequencies:
- **Hourly**: Every hour (high-volume providers)
- **Weekly**: Once per week (low-change properties)
- **On-demand**: Manual triggers only


### Feed Requirements

**Your feed endpoint must:**
- Return the complete current dataset every time
- Include all active assets (no incremental updates)
- Omit or mark inactive any assets no longer available
- Respond within 10 minutes
- Return valid JSON format
- Handle HTTP Basic authentication

**Example feed response:**
```json
{
  "timestamp": "2025-01-15T14:30:00Z",
  "total_assets": 150,
  "assets": [
    {
      "id": "ABC123",
      "name": "Oceanfront Condo",
      // ... complete asset data
    }
  ]
}
```

## Hybrid Integration Approach

You can combine both approaches for maximum flexibility. For instance, you might run a daily full data pull via the Feed to catch any missed updates and ensure consistency, and also push critical changes or new assets via the API as they occur. This hybrid approach uses the feed as a reliable batch sync (an audit/passive backup) and webhooks for immediacy.

**Pricing Updates:** In particular, use a dedicated API/webhook for price updates. Frequent price changes (market data, valuation updates, etc.) should be sent through our pricing endpoint or pushed via webhook rather than waiting for the next feed cycle. This way, investors always see the latest prices.

By understanding the trade-offs, you can choose the right method (or mix) for your needs. Pull feeds give you simple, complete snapshots on a schedule, while webhooks let you keep data current in real time. Combining them ensures robust and up-to-date integration.

