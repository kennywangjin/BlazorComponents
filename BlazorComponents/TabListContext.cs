using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BlazorComponents
{
    public class TabListContext
    {
        public event Action StateChanged;

        public string ActiveTabId { get; set; }

        public void OnChangeActiveTab(string tabId)
        {
            ActiveTabId = tabId;
            StateChanged?.Invoke();
        }
    }
}
