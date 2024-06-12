using DevPortfolio.Requests;
using DevPortfolio.Responses;

namespace DevPortfolio.Config
{
    public interface IInterviewGradingService
    {
        Task<string> CreatePredictionAsync(QuestionFeedbackRequest request);
        Task<QuestionFeedbackResponse> GetPredictionStatusAsync(string id);
    }
}