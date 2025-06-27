export enum AgentType {
  NIA = 'Nia', // Salon Assistant
  BLAZE = 'Blaze', // Marketing Guru
  NOVA = 'Nova', // Business Strategist
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  agentType?: AgentType; // Optional: good for displaying system messages related to agents
}

export interface MinimalChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Booking {
  id: string;
  clientName: string;
  service: string;
  dateTime: Date;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
}