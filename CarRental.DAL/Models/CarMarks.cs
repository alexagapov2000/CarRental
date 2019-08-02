using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models
{
    public partial class CarMarks
    {
        public CarMarks()
        {
            Cars = new HashSet<Cars>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int FuelConsumption { get; set; }
        public int Seats { get; set; }

        public virtual ICollection<Cars> Cars { get; set; }
    }
}
