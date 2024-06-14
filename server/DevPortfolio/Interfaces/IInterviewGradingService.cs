using DevPortfolio.Requests;
using DevPortfolio.Responses;

namespace DevPortfolio.Interfaces
{
    public interface IInterviewGradingService
    {
        Task<string> CreatePredictionAsync(QuestionFeedbackRequest request);
        Task<QuestionFeedbackResponse> GetPredictionAsync(string id);
    }
}