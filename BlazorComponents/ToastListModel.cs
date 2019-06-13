using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BlazorComponents
{
    public class ToastListModel
    {
        public event EventHandler StateChanged;

        public HashSet<Guid> ClosingList { get; } = new HashSet<Guid>(3);

        public Dictionary<Guid, ToastMessage> MessageList { get; } = new Dictionary<Guid, ToastMessage>(3);

        public int AutoRemoveDelay { get; set; } = 5000;

        public void AddInformation(string info) => AddMessage("Information", info, ToastMessageType.Information);

        public void AddWarning(string warning) => AddMessage("Warning", warning, ToastMessageType.Warning);

        public void AddDanger(string danger) => AddMessage("Danger", danger, ToastMessageType.Danger);

        public void AddMessage(string header, string body, ToastMessageType messageType = ToastMessageType.Information)
            => AddMessage(new ToastMessage(header, body, messageType));


        public void AddMessage(ToastMessage message)
        {
            Guid id = Guid.NewGuid();
            MessageList.Add(id, message);
            if (AutoRemoveDelay > 1000)
            {
                Task.Delay(AutoRemoveDelay).ContinueWith(t => RemoveMessage(id));
            }
            NotifyStateChanged();
        }

        public void RemoveMessage(Guid id)
        {
            ClosingList.Add(id);
            NotifyStateChanged();
        }

        public void OnRemoved(Guid id)
        {
            ClosingList.Remove(id);
            MessageList.Remove(id);
            NotifyStateChanged();
        }

        private void NotifyStateChanged() => StateChanged?.Invoke(this, EventArgs.Empty);
    }
}
