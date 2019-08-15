using System;
using System.Collections.Generic;
using System.Text;

namespace CarRental.BL.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public decimal? Price { get; set; }
        public string RentalCompanyName { get; set; }
        public int Seats { get; set; }
        public int FuelConsumption { get; set; }
        public DateTime BookedFrom { get; set; }
        public DateTime BookedTo { get; set; }
    }
}
