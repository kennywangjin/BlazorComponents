using System.Collections.Generic;

namespace BlazorComponents.ChartObjects
{
    public class ChartOption
    {
        public Title Title { get; set; }
        public SubTitle Subtitle { get; set; }
        public IEnumerable<XAxis> XAxis { get; set; }
        public IEnumerable<YAxis> YAxis { get; set; }
        public IEnumerable<Series> Series { get; set; }
    }
}