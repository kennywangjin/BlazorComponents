using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorComponents
{
    public enum ModalSize
    {
        Small,
        Default,
        Large,
        ExtraLarge
    }

    public static class ModalSizeExtension
    {
        public static string GetCssClass(this ModalSize modalSize)
        {
            return modalSize switch
            {
                ModalSize.Small => "modal-sm",
                ModalSize.Large => "modal-lg",
                ModalSize.ExtraLarge => "modal-xl",
                _ => string.Empty,
            };
        }
    }
}
