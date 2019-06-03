using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models
{
    public partial class Cities
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }

        public virtual Countries Country { get; set; }
    }
}
