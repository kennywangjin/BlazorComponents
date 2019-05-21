using System.Collections.Generic;
using System;

namespace BlazorComponents.ChartObjects
{
    public class ChartOption
    {
        public Title Title { get; } = new Title("Chart");
        public SubTitle Subtitle { get; } = new SubTitle("");
        public XAxis[] XAxis { get; set; } = Array.Empty<XAxis>();
        public YAxis[] YAxis { get; set; } = Array.Empty<YAxis>();
        public Series[] Series { get; set; } = Array.Empty<Series>();
    }
}