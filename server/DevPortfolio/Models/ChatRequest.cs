﻿using System.Text.Json.Serialization;

namespace DevPortfolio.Models
{
    public class ChatRequest
    {
        [JsonPropertyName("top_p")]
        public float NucleusSamplingFactor { get; set; }

        [JsonPropertyName("temperature")]
        public float Temperature { get; set; }

        [JsonPropertyName("max_new_tokens")]
        public int MaxTokens {  get; set; }

        [JsonPropertyName("system_prompt")]
        public string SystemPrompt { get; set; } 

        [JsonPropertyName("prompt")]
        public string UserPrompt { get; set; } 
    }
}
