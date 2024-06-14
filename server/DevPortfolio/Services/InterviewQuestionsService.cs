using DevPortfolio.Data;
using DevPortfolio.Enums;
using DevPortfolio.Interfaces;
using DevPortfolio.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DevPortfolio.Services
{
    public class InterviewQuestionsService : IInterviewQuestionsService
    {
        private readonly ApiContext _context;

        public InterviewQuestionsService(ApiContext context)
        {
            _context = context;
        }

        public IEnumerable<InterviewQuestion> GetQuestionsByTopic(InterviewTopic topic)
        {
            try
            {
                var questions = _context.InterviewQuestions.Where(q => q.Topic == topic).ToList();

                if (questions.Count == 0)
                {
                    throw new Exception("No questions found for the specified topic.");
                }

                if (questions.Count <= 5)
                {
                    return questions;
                }

                Random random = new Random();
                HashSet<int> usedIndices = new HashSet<int>();
                List<InterviewQuestion> randomQuestions = new List<InterviewQuestion>();

                while (randomQuestions.Count < 5)
                {
                    int randomIndex = random.Next(questions.Count);
                    if (!usedIndices.Contains(randomIndex))
                    {
                        randomQuestions.Add(questions[randomIndex]);
                        usedIndices.Add(randomIndex);
                    }
                }

                return randomQuestions;
            }
            catch 
            {
                throw;
            }
        }
    }
}
