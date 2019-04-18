using System;

namespace My.BlazorComponents
{
    public static class DateTimeExtension
    {
        public static DateTime StartOfDay(this DateTime time) => new DateTime(time.Year, time.Month, time.Day, 0, 0, 0);

        public static DateTime EndOfDay(this DateTime time) => new DateTime(time.Year, time.Month, time.Day, 23, 59, 59);

        public static DateTime StartOfMonth(this DateTime time) => new DateTime(time.Year, time.Month, 1, 0, 0, 0);

        public static DateTime EndOfMonth(this DateTime time) => time.AddMonths(1).StartOfMonth().AddSeconds(-1);

        public static DateTime StartOfYear(this DateTime time) => new DateTime(time.Year, 1, 1, 0, 0, 0);

        public static DateTime EndOfYear(this DateTime time) => new DateTime(time.Year, 12, 31, 23, 59, 59);
    }
}