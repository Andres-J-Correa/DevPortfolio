using DevPortfolio.Interfaces;
using DevPortfolio.Models;
using DevPortfolio.Requests;
using DevPortfolio.Responses;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;

namespace DevPortfolio.Config
{
    public class InterviewGradingService : IInterviewGradingService
    {
        private readonly HttpClient _httpClient;
        private readonly ReplicateSettings _config;

        public InterviewGradingService(HttpClient httpClient, IOptions<ReplicateSettings> options)
        {
            _httpClient = httpClient;
            _config = options.Value;
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Token", _config.ApiToken);
        }

        public async Task<string> CreatePredictionAsync(QuestionFeedbackRequest request)
        {
            try
            {
                string message = _config.InterviewPromptSuffix.Replace("{{question}}", request.Question)
                                                .Replace("{{answer}}", request.Answer);

                ChatRequest chatRequest = new ChatRequest()
                {
                    Temperature = _config.Temperature,
                    NucleusSamplingFactor = _config.NucleusSamplingFactor,
                    MaxTokens = _config.MaxTokens,
                    SystemPrompt = _config.SystemPrompt,
                    UserPrompt = message
                };

                var payload = new
                {
                    input = chatRequest
                };

                var content = new StringContent(System.Text.Json.JsonSerializer.Serialize(payload), System.Text.Encoding.UTF8, "application/json");

                HttpResponseMessage response = await _httpClient.PostAsync($"{_config.ApiUrl}/{_config.ModelPath}", content);
                response.EnsureSuccessStatusCode();

                string responseContent = await response.Content.ReadAsStringAsync();

                JObject jsonObject = JObject.Parse(responseContent);

                JToken idToken = jsonObject["id"];

                string id = idToken.ToString();

                return id;
            }
            catch
            {
                throw;
            }
        }

        public async Task<QuestionFeedbackResponse> GetPredictionAsync(string id)
        {
            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync($"{_config.ApiUrl}/predictions/{id}");
                response.EnsureSuccessStatusCode();

                string responseContent = await response.Content.ReadAsStringAsync();

                QuestionFeedbackResponse gradedResponse = JsonConvert.DeserializeObject<QuestionFeedbackResponse>(responseContent);

                if (gradedResponse == null) {

                    throw new Exception("Error getting prediction");
                }

                if(gradedResponse.Status == "failed")
                {
                    throw new Exception("Error getting prediction");
                }
                else if(gradedResponse.Status != "succeeded")
                {
                    return null;
                }

                string gradingResultJsonString = string.Join("", gradedResponse.Output);

                gradedResponse.GradingResult = JsonConvert.DeserializeObject<GradingResult>(gradingResultJsonString);

                if (gradedResponse.GradingResult == null) {
                    throw new Exception("Error getting prediction");
                }

                return gradedResponse;
            }
            catch
            {
                throw;
            }
        }
    }
}
