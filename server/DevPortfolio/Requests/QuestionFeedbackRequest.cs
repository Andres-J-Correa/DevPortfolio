using System.ComponentModel.DataAnnotations;

namespace DevPortfolio.Requests
{
    public class QuestionFeedbackRequest
    {
        [Required]
        [MinLength(1)]
        public string Question {  get; set; }

        [Required]
        [StringLength(500,MinimumLength = 1)]
        public string Answer { get; set; }
    }
}
