using DevPortfolio.Interfaces;
using DevPortfolio.Requests;
using DevPortfolio.Responses;
using Microsoft.AspNetCore.Mvc;

namespace DevPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterviewGradingController(IInterviewGradingService replicateService, ILogger<InterviewGradingController> logger) : ControllerBase
    {
        private readonly IInterviewGradingService _replicateService = replicateService;
        private readonly ILogger<InterviewGradingController> _logger = logger;

        [HttpPost("create")]
        public async Task<IActionResult> CreatePrediction(QuestionFeedbackRequest request)
        {
            try
            {
                var result = await _replicateService.CreatePredictionAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return StatusCode(500, $"Error creating prediction: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrediction(string id)
        {
            try
            {
                QuestionFeedbackResponse result = await _replicateService.GetPredictionAsync(id);

                if(result == null)
                {
                    return StatusCode(404, "No prediction found");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return StatusCode(500, $"Error getting prediction: {ex.Message}");
            }
        }
    }
}
