import Anthropic from '@anthropic-ai/sdk';

// The newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateAstrologicalResponse(userMessage: string): Promise<string> {
  try {
    const systemPrompt = `You are a wise and insightful astrological advisor with deep knowledge of Vedic astrology, 
    planetary movements, and their influence on human life. Respond to queries with mystical wisdom while maintaining 
    professionalism and accuracy. Include references to current planetary positions and astrological phenomena when relevant.`;

    const response = await anthropic.messages.create({
      max_tokens: 1024,
      messages: [{ 
        role: 'user', 
        content: userMessage 
      }],
      model: 'claude-3-5-sonnet-20241022',
      system: systemPrompt,
    });

    return response.content[0].text || '';
  } catch (error) {
    console.error('Error generating astrological response:', error);
    throw new Error('Failed to generate astrological response');
  }
}
