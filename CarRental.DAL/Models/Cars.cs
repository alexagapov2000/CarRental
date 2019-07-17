using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models
{
    public partial class Cars
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FuelConsumption { get; set; }
        public int CarMarkId { get; set; }
    }
}
