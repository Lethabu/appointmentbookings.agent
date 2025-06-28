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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const constants_1 = require("../../../../Lethabu/Lethabu Agents/smart-salon-hq/constants");
const ChatInput = ({ onSendMessage, isLoading }) => {
    const [inputText, setInputText] = (0, react_1.useState)('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim() && !isLoading) {
            onSendMessage(inputText.trim());
            setInputText('');
        }
    };
    return (<form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 bg-white">
      <div className="flex items-center space-x-3">
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type your message..." className="flex-1 p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow" disabled={isLoading}/>
        <button type="submit" className="bg-primary hover:bg-primary-dark text-white p-3 rounded-lg disabled:opacity-50 transition-colors flex items-center justify-center" disabled={isLoading || !inputText.trim()}>
          {isLoading ? (<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>) : (<constants_1.IconSend className="h-5 w-5"/>)}
        </button>
      </div>
    </form>);
};
exports.default = ChatInput;
