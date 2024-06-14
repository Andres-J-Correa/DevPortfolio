using DevPortfolio.Enums;
using DevPortfolio.Interfaces;
using DevPortfolio.Models;
using Microsoft.AspNetCore.Mvc;

namespace DevPortfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InterviewQuestionsController : ControllerBase
    {
        private readonly IInterviewQuestionsService _service;
        private readonly ILogger<InterviewQuestionsController> _logger;

        public InterviewQuestionsController(IInterviewQuestionsService service, ILogger<InterviewQuestionsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet("{topic}")]
        public ActionResult<IEnumerable<InterviewQuestion>> GetQuestionsByTopic(InterviewTopic topic)
        {
            try
            {
                var questions = _service.GetQuestionsByTopic(topic);
                return Ok(questions);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error Getting Questions by Topic. {ex}");
                return StatusCode(500, "An unexpected error occurred. Please try again later.");

            }
        }
    }
}
