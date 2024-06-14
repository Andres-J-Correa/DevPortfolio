using DevPortfolio.Enums;
using System.ComponentModel.DataAnnotations;

namespace DevPortfolio.Models
{
    public class InterviewQuestion
    {
        [Key]
        public int Id { get; set; }
        public string Question {  get; set; }
        public InterviewTopic Topic { get; set; }
    }
}
