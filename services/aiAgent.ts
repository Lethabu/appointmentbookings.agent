import { AgentType, AgentAction } from '../types';

export function performAgentAction(agent: AgentType, action: string, payload?: any): AgentAction {
  // Example: Add AI logic or call external AI API here
  // For now, just echo the action
  return {
    agent,
    action,
    payload,
    timestamp: Date.now(),
  };
}