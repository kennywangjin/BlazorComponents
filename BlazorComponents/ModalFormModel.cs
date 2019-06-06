using System;
using System.Threading.Tasks;

namespace BlazorComponents
{
    public abstract class ModalFormModel
    {
        private bool _isSubmitted = false;
        private string _message = string.Empty;

        public event Func<(bool IsSubmitted, string Message), Task> Closed;

        public bool IsVisible { get; private set; } = false;
        public void Close() => IsVisible = false;
        public void Open() => IsVisible = true;

        public async Task OnValidSubmit()
        {
            try
            {
                _message = await ValidSubmitCore();
                _isSubmitted = true;
                Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public abstract Task<string> ValidSubmitCore();

        public Task OnClosed()
        {
            return Closed?.Invoke((_isSubmitted, _message));
        }
    }
}
