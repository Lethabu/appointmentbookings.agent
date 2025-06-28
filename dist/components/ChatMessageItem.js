"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const constants_1 = require("../constants");
const ChatMessageItem = ({ message }) => {
    const isUser = message.role === 'user';
    const bubbleClasses = isUser
        ? 'bg-primary text-white self-end rounded-l-lg rounded-tr-lg'
        : 'bg-neutral-200 text-neutral-800 self-start rounded-r-lg rounded-tl-lg';
    const containerClasses = isUser ? 'flex justify-end' : 'flex justify-start';
    const Icon = isUser ? constants_1.IconUserCircle : constants_1.IconSparkles;
    return (<div className={`flex items-end space-x-2 mb-3 ${containerClasses}`}>
      {!isUser && <Icon className="h-8 w-8 text-neutral-400 flex-shrink-0 mb-1"/>}
      <div className={`p-3 max-w-md md:max-w-lg lg:max-w-xl shadow-md ${bubbleClasses}`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-indigo-200' : 'text-neutral-500'} text-right`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isUser && <Icon className="h-8 w-8 text-primary flex-shrink-0 mb-1"/>}
    </div>);
};
exports.default = ChatMessageItem;
