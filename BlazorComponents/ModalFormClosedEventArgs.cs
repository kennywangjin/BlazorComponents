using System;

namespace BlazorComponents
{
    public class ModalFormClosedEventArgs : EventArgs
    {
        public bool IsSubmitted { get; }

        public string Message { get; }

        public ModalFormClosedEventArgs(bool isSubmitted, string message = "")
        {
            IsSubmitted = isSubmitted;
            Message = message;
        }
    }
}
