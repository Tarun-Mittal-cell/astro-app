const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://astro-vedic.vercel.app/api'
  : 'http://localhost:3005/api';

// Custom fetch wrapper with retries and error handling
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3
): Promise<any> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'API Error');
      (error as any).status = response.status;
      (error as any).data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (retries > 0) {
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, 4 - retries) * 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

// API wrapper with error handling
const api = {
  async get(endpoint: string, params?: Record<string, string>) {
    const url = new URL(BASE_URL + endpoint);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return fetchWithRetry(url.toString(), {
      method: 'GET',
      credentials: 'include'
    });
  },

  async post(endpoint: string, data?: any) {
    return fetchWithRetry(BASE_URL + endpoint, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data)
    });
  },

  async put(endpoint: string, data?: any) {
    return fetchWithRetry(BASE_URL + endpoint, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(data)
    });
  },

  async delete(endpoint: string) {
    return fetchWithRetry(BASE_URL + endpoint, {
      method: 'DELETE',
      credentials: 'include'
    });
  }
};

// API endpoints with retry logic
export const apiClient = {
  // Astrologers
  async getAstrologers() {
    try {
      const response = await api.get('/astrologers');
      return response.data;
    } catch (error) {
      console.error('Error fetching astrologers:', error);
      throw error;
    }
  },

  // Horoscopes
  async getDailyHoroscope(sign: string) {
    try {
      const response = await api.get(`/horoscope/${sign}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching horoscope:', error);
      throw error;
    }
  },

  // Birth Charts
  async generateBirthChart(data: {
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    latitude: number;
    longitude: number;
  }) {
    try {
      const response = await api.post('/birth-charts', data);
      return response.data;
    } catch (error) {
      console.error('Error generating birth chart:', error);
      throw error;
    }
  },

  async getBirthChart(id: number) {
    try {
      const response = await api.get(`/birth-charts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching birth chart:', error);
      throw error;
    }
  },

  // Consultations
  async createConsultation(data: {
    userId: number;
    astrologerId: number;
    type: string;
    scheduledTime: string;
  }) {
    try {
      const response = await api.post('/consultations', data);
      return response.data;
    } catch (error) {
      console.error('Error creating consultation:', error);
      throw error;
    }
  },

  async getConsultation(id: number) {
    try {
      const response = await api.get(`/consultations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching consultation:', error);
      throw error;
    }
  },

  // Chat
  async sendChatMessage(message: string) {
    try {
      const response = await api.post('/chat/send', { message });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  async getChatHistory() {
    try {
      const response = await api.get('/chat/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  },

  // Planetary Alignments
  async getPlanetaryAlignments(date?: string) {
    try {
      const params = date ? { date } : {};
      const response = await api.get('/planetary-alignments', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching planetary alignments:', error);
      throw error;
    }
  },

  // AI Predictions
  async generatePrediction(predictionType: string) {
    try {
      const response = await api.post('/predictions', { predictionType });
      return response.data;
    } catch (error) {
      console.error('Error generating prediction:', error);
      throw error;
    }
  },

  async getPredictions() {
    try {
      const response = await api.get('/predictions');
      return response.data;
    } catch (error) {
      console.error('Error fetching predictions:', error);
      throw error;
    }
  },

  async submitPredictionFeedback(id: number, feedback: string) {
    try {
      const response = await api.post(`/predictions/${id}/feedback`, { feedback });
      return response.data;
    } catch (error) {
      console.error('Error submitting prediction feedback:', error);
      throw error;
    }
  }
};

// Export types
export type ApiResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  details?: string;
  metadata: {
    timestamp: string;
    path: string;
    method: string;
    duration: number;
  };
};