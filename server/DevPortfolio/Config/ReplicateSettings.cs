namespace DevPortfolio.Config
{
    public class ReplicateSettings
    {
        public string ApiToken { get; set; } 
        public float Temperature { get; set; }
        public int MaxTokens { get; set; }
        public float RepetitionPenalty { get; set; }
        public string SystemPrompt { get; set; } 
        public float NucleusSamplingFactor { get; set; }

        public string InterviewPromptSuffix { get; set; } 
    }
}
