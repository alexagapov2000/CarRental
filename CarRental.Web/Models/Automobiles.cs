using System;
using System.Collections.Generic;

namespace CarRental.Web.Models
{
    public partial class Automobiles
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FuelConsumption { get; set; }
        public int GearboxId { get; set; }
        public int ManufacturerId { get; set; }
    }
}
