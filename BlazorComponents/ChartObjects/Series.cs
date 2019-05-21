using System.Collections.Generic;
using System.Linq;

namespace BlazorComponents.ChartObjects
{
    public class Series
    {
        public string Type { get; }
        public string Name { get; set; } = "Series";
        public int YAxis { get; set; } = 0;
        public IEnumerable<double[]>? Data { get; set; }

        public Series(string type)
        {
            Type = type;
        }
    }
}