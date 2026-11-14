import time
import asyncio
from typing import Dict, List
from fastapi import Request, HTTPException, status
from app.config import settings

class InMemoryRateLimiter:
    """
    Sliding-window in-memory rate limiter per client IP.
    Prevents spamming and automated bot submissions without external Redis dependencies.
    """
    def __init__(self, max_requests: int = 5, window_seconds: int = 600):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.ip_history: Dict[str, List[float]] = {}
        self._lock = asyncio.Lock()

    def _get_client_ip(self, request: Request) -> str:
        # Check X-Forwarded-For header for reverse proxy configurations
        forwarded_for = request.headers.get("x-forwarded-for")
        if forwarded_for:
            return forwarded_for.split(",")[0].strip()
        client = request.client
        return client.host if client else "unknown"

    async def check_rate_limit(self, request: Request):
        client_ip = self._get_client_ip(request)
        now = time.time()
        cutoff = now - self.window_seconds

        async with self._lock:
            history = self.ip_history.get(client_ip, [])
            # Purge timestamps outside the window
            valid_timestamps = [ts for ts in history if ts > cutoff]

            if len(valid_timestamps) >= self.max_requests:
                oldest_in_window = valid_timestamps[0]
                retry_after = int(self.window_seconds - (now - oldest_in_window)) + 1
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail=(
                        f"Too many enquiry submissions received from your connection. "
                        f"Please wait {retry_after} seconds before submitting again."
                    ),
                    headers={"Retry-After": str(retry_after)},
                )

            # Record this attempt
            valid_timestamps.append(now)
            self.ip_history[client_ip] = valid_timestamps

limiter = InMemoryRateLimiter(
    max_requests=settings.RATE_LIMIT_MAX_REQUESTS,
    window_seconds=settings.RATE_LIMIT_WINDOW_SECONDS,
)
