using DevPortfolio.Enums;
using DevPortfolio.Models;

namespace DevPortfolio.Interfaces
{
    public interface IInterviewQuestionsService
    {
        IEnumerable<InterviewQuestion> GetQuestionsByTopic(InterviewTopic topic);
    }
}