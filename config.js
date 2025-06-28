// Configuration file for API keys and settings
const config = {
    // Hugging Face API Token
    HF_TOKEN: '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',
    
    // Other API configurations
    API_ENDPOINTS: {
        DEEPSEEK: 'https://router.huggingface.co/fireworks-ai/inference/v1/chat/completions',
        MODEL: 'accounts/fireworks/models/deepseek-r1'
    },
    
    // Feature flags
    ENABLE_RESUME_ANALYSIS: true,
    ENABLE_NUDGE: true
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} 