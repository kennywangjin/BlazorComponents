using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace My.BlazorComponents
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
            switch (modalSize)
            {
                case ModalSize.Small:
                    return "modal-sm";
                case ModalSize.Large:
                    return "modal-lg";
                case ModalSize.ExtraLarge:
                    return "modal-xl";
                case ModalSize.Default:
                default:
                    return string.Empty;
            }
        }
    }
}
