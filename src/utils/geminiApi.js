// src/utils/geminiApi.js

// This file would typically make HTTP requests to your backend,
// which then communicates with the actual Gemini API.
// For this example, we'll simulate responses.

const simulateGeminiResponse = (prompt, type) => {
  return new Promise(resolve => {
    setTimeout(() => { // Simulate network delay
      if (type === 'bet_suggestion') {
        const suggestions = [
          "Complete a 30-day Plank Challenge (increase time daily)",
          "Read 4 non-fiction books this month, summarize each",
          "Learn 10 new words in a foreign language daily for a month",
          "Meditate 15 minutes every morning for 30 days",
          "Run a total of 50 miles in one month",
          "Cook 5 new healthy recipes each week for a month"
        ];
        resolve({
          success: true,
          suggestions: suggestions.sort(() => 0.5 - Math.random()).slice(0, 3) // Get 3 random
        });
      } else if (type === 'photo_verification') {
        // Very basic simulation. Real Gemini would do image analysis.
        if (prompt.includes('gym') && prompt.includes('person')) {
          resolve({
            success: true,
            isSuspicious: Math.random() < 0.2, // 20% chance of being suspicious
            reason: Math.random() < 0.2 ? "Image appears to be from a different location or time." : "Image looks authentic.",
            confidence: (Math.random() * 0.3 + 0.7).toFixed(2), // Confidence between 70-100%
          });
        } else {
            resolve({
                success: true,
                isSuspicious: Math.random() < 0.4, // More suspicious if not specific
                reason: "Image content does not clearly match activity or shows signs of manipulation.",
                confidence: (Math.random() * 0.4 + 0.5).toFixed(2), // Confidence between 50-90%
            });
        }
      } else {
        resolve({ success: false, error: "Unknown Gemini interaction type." });
      }
    }, 1500); // 1.5 second delay
  });
};

export const getBetSuggestions = async (userPreferences) => {
  console.log("Requesting bet suggestions from Gemini with preferences:", userPreferences);
  return simulateGeminiResponse(userPreferences, 'bet_suggestion');
};

export const verifyPhoto = async (imageData, betActivity) => {
  console.log("Sending photo for verification to Gemini:", { imageData: imageData.uri, betActivity });
  // In a real app, `imageData` would be uploaded to your server first,
  // then the server sends the image URL to Gemini.
  const prompt = `Analyze this image for the bet activity: "${betActivity}". Does it appear to show the user performing the activity? Is there any evidence of digital manipulation or inconsistency with a live photo?`;
  return simulateGeminiResponse(prompt, 'photo_verification');
};
