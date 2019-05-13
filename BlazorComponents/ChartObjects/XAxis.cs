using System;

namespace BlazorComponents.ChartObjects
{
    public class XAxis
    {
        public string Type { get; }

        public XAxis(string type = "linear")
        {
            Type = type;
        }
    }
}