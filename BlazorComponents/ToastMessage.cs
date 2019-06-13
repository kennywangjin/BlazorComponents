using Microsoft.AspNetCore.Components;
using System;

namespace BlazorComponents
{
    public enum ToastMessageType
    {
        Information,
        Warning,
        Danger
    }

    public readonly struct ToastMessage
    {
        public MarkupString Header { get; }

        public MarkupString Body { get; }

        public ToastMessageType MessageType { get; }

        public ToastMessage(string header, string body, ToastMessageType messageType)
        {
            Header = (MarkupString)header;
            Body = (MarkupString)body;
            MessageType = messageType;
        }
    }
}
