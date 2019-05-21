using System;

namespace BlazorComponents.ChartObjects
{
    public class YAxis
    {
        public YAxisTitle Title { get; set; } = new YAxisTitle("Values");
        public bool Opposite { get; set; } = false;
    }
}