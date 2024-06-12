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
                    RepetitionPenalty = _config.RepetitionPenalty,
                    MaxTokens = _config.MaxTokens,
                    SystemPrompt = _config.SystemPrompt,
                    UserPrompt = message
                };

                var payload = new
                {
                    input = chatRequest
                };

                var content = new StringContent(System.Text.Json.JsonSerializer.Serialize(payload), System.Text.Encoding.UTF8, "application/json");

                HttpResponseMessage response = await _httpClient.PostAsync("https://api.replicate.com/v1/models/meta/llama-2-70b-chat/predictions", content);
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

        public async Task<QuestionFeedbackResponse> GetPredictionStatusAsync(string id)
        {
            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync($"https://api.replicate.com/v1/predictions/{id}");
                response.EnsureSuccessStatusCode();

                string responseContent = await response.Content.ReadAsStringAsync();

                QuestionFeedbackResponse gradedResponse = JsonConvert.DeserializeObject<QuestionFeedbackResponse>(responseContent);

                if (gradedResponse.Status == "succeeded")
                {
                    HttpResponseMessage deleteRequest = await _httpClient.GetAsync($"https://api.replicate.com/v1/predictions/{id}/cancel");
                    deleteRequest.EnsureSuccessStatusCode();
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
