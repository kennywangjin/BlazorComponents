using System;
using System.Threading.Tasks;

namespace BlazorComponents
{
    public abstract class ModalFormModel
    {
        private bool _isSubmitted = false;
        private string _message = string.Empty;

        public event EventHandler<ModalFormClosedEventArgs> Closed;

        public bool IsVisible { get; set; } = true;

        public async Task OnValidSubmit()
        {
            try
            {
                _message = await ValidSubmitCore();
                _isSubmitted = true;
                IsVisible = false;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public void OnClosed() => Closed?.Invoke(this, new ModalFormClosedEventArgs(_isSubmitted, _message));

        public abstract Task<string> ValidSubmitCore();
    }
}
