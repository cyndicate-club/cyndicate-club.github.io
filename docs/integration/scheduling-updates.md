# Feed Scheduling and Updates

We will fetch the full JSON feed **daily** (or at another agreed interval). Each fetch should return the complete set of current assets. If an asset no longer exists, it should be omitted or marked inactive in the feed. We treat the feed as a batch update: after fetching, we reconcile our database to match your feed. Because the entire dataset is retrieved each time, incremental/delta updates are not needed in the feed; just send the current state of every asset.

### Default Schedule
- **Frequency**: Once per day
- **Timeout**: 30 seconds per request
- **Retries**: 3 attempts with exponential backoff (30 seconds between attempts)

### Custom Schedules
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

