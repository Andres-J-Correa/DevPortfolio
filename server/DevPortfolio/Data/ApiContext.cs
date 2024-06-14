using DevPortfolio.Models;
using Microsoft.EntityFrameworkCore;


namespace DevPortfolio.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options) { }
        
        public DbSet<InterviewQuestion> InterviewQuestions { get; set; }
    }
}
