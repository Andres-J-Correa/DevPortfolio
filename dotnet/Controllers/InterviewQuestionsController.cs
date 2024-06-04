using DevPortfolio.Data;
using DevPortfolio.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DevPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterviewQuestionsController : ControllerBase
    {

        private readonly ApiContext _context;

        public InterviewQuestionsController(ApiContext context)
        {
            _context = context;
        }

        [HttpPost]
        public JsonResult Create (InterviewQuestion question)
        {
            if(question.Id == 0)
            {
                _context.Add(question);
            }

            _context.SaveChanges();

            return new JsonResult(Ok());

        }
    }
}
