using System;
using System.Collections.Generic;

namespace CarRental.BL.DTOs
{
    public class CarDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public string RentalCompanyName { get; set; }
        public int Seats { get; set; }
        public int FuelConsumption { get; set; }
        public DateTime? BookedBefore { get; set; }
        public int Count { get; set; }

        public static CarDTO AddCount(CarDTO withoutCount, int count)
        {
            withoutCount.Count = count;
            return withoutCount;
        }
    }
}
