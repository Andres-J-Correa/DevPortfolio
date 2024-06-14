using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace DevPortfolio.Services
{
    public class RateLimitingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IMemoryCache _cache;
        private readonly ILogger<RateLimitingMiddleware> _logger;
        private const int MAX_REQUESTS_PER_DAY = 20;

        public RateLimitingMiddleware(RequestDelegate next, IMemoryCache cache, ILogger<RateLimitingMiddleware> logger)
        {
            _next = next;
            _cache = cache;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var ipAddress = context.Connection.RemoteIpAddress?.ToString();
            if (ipAddress != null)
            {
                var cacheKey = $"RateLimit_{ipAddress}";
                var requestCount = _cache.GetOrCreate(cacheKey, entry =>
                {
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1);
                    return 0;
                });

                if (requestCount >= MAX_REQUESTS_PER_DAY)
                {
                    _logger.LogWarning($"Rate limit exceeded for IP: {ipAddress}");
                    context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                    await context.Response.WriteAsync("Rate limit exceeded. Try again later.");
                    return;
                }

                requestCount++;
                _cache.Set(cacheKey, requestCount);
                _logger.LogInformation($"IP: {ipAddress} - Request count: {requestCount}");
            }

            await _next(context);
        }
    }
}
