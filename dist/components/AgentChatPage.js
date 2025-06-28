"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const constants_1 = require("../constants");
const AgentSelector_1 = __importDefault(require("./AgentSelector"));
const ChatMessageItem_1 = __importDefault(require("./ChatMessageItem"));
const ChatInput_1 = __importDefault(require("./ChatInput"));
const geminiService_1 = require("../services/geminiService");
const AgentChatPage = () => {
    const [selectedAgent, setSelectedAgent] = (0, react_1.useState)(constants_1.Agents[0].type);
    const [chatHistory, setChatHistory] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const chatContainerRef = (0, react_1.useRef)(null);
    const loadChatHistory = (0, react_1.useCallback)((agent) => {
        const storedHistory = localStorage.getItem(`chatHistory_${agent}`);
        if (storedHistory) {
            setChatHistory(JSON.parse(storedHistory));
        }
        else {
            const systemInstruction = (0, constants_1.getAgentSystemInstruction)(agent);
            setChatHistory([{
                    id: 'system-init',
                    role: 'model',
                    text: `You are now chatting with ${agent}. ${systemInstruction.substring(0, systemInstruction.indexOf('.') + 1) || systemInstruction}`,
                    timestamp: Date.now(),
                    agentType: agent
                }]);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        loadChatHistory(selectedAgent);
    }, [selectedAgent, loadChatHistory]);
    (0, react_1.useEffect)(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);
    const handleSelectAgent = (agent) => {
        setSelectedAgent(agent);
    };
    const handleSendMessage = async (userMessageText) => {
        const newUserMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            text: userMessageText,
            timestamp: Date.now(),
        };
        // Prepare history for Gemini: only user and model roles, and only role and text fields.
        const historyForGemini = chatHistory
            .filter(msg => msg.role === 'user' || msg.role === 'model')
            .map(({ role, text }) => ({ role, text }));
        setChatHistory(prev => [...prev, newUserMessage]);
        setIsLoading(true);
        try {
            const agentResponseText = await (0, geminiService_1.generateAgentResponse)(selectedAgent, userMessageText, historyForGemini);
            const newAgentMessage = {
                id: `agent-${Date.now()}`,
                role: 'model',
                text: agentResponseText,
                timestamp: Date.now(),
                agentType: selectedAgent
            };
            setChatHistory(prev => {
                const updatedHistory = [...prev, newAgentMessage];
                localStorage.setItem(`chatHistory_${selectedAgent}`, JSON.stringify(updatedHistory));
                return updatedHistory;
            });
        }
        catch (error) {
            console.error("Failed to get agent response:", error);
            const errorMessage = {
                id: `error-${Date.now()}`,
                role: 'model',
                text: "Sorry, I couldn't process your request right now.",
                timestamp: Date.now(),
                agentType: selectedAgent
            };
            setChatHistory(prev => {
                const updatedHistory = [...prev, errorMessage];
                localStorage.setItem(`chatHistory_${selectedAgent}`, JSON.stringify(updatedHistory));
                return updatedHistory;
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    const currentAgentDetails = constants_1.Agents.find(a => a.type === selectedAgent);
    return (<div className="flex flex-col h-[calc(100vh-8rem)] bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="p-4 border-b border-neutral-200 bg-neutral-50">
        <AgentSelector_1.default selectedAgent={selectedAgent} onSelectAgent={handleSelectAgent}/>
        {currentAgentDetails && (<p className="text-sm text-neutral-600 mt-1">{currentAgentDetails.description}</p>)}
      </div>
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-100">
        {chatHistory.map((msg) => (<ChatMessageItem_1.default key={msg.id} message={msg}/>))}
        {isLoading && (<div className="flex justify-start items-center space-x-2">
            <div className="h-8 w-8 bg-neutral-200 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="animate-pulse flex space-x-1">
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full"></div>
              </div>
            </div>
            <div className="p-3 max-w-md bg-neutral-200 text-neutral-800 self-start rounded-r-lg rounded-tl-lg shadow-md">
                <p className="text-sm italic">Agent is typing...</p>
            </div>
          </div>)}
      </div>
      <ChatInput_1.default onSendMessage={handleSendMessage} isLoading={isLoading}/>
    </div>);
};
exports.default = AgentChatPage;
