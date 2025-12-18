interface TrackerContent {
  count: number;
  expiresAt: number;
}

const trackers: Record<string, TrackerContent> = {};

// Tracks a request by key (userId | uuid) to prevent abuse to APIs or database
function rateLimitByKey(
  key: string,
  limit: number = 1,
  window: number = 10000
): boolean {
  // use existing key or start a new tracker
  const tracker = trackers[key] || { count: 0, expiresAt: 0 };

  // if this request has not been tracked, add it by key
  if (!trackers[key]) {
    trackers[key] = tracker;
  }

  // if expired, reset the tracker
  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count++;

  // if the count exceeds the limit, throw an error
  if (tracker.count > limit) {
    // throw new Error("Rate limit exceeded");
    return true;
  }

  return false;
}

export default rateLimitByKey;
