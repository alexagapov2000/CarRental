using System;
using System.Collections.Generic;

namespace CarRental.Web.Models
{
    public partial class Cities
    {
        public Cities()
        {
            CityStreets = new HashSet<CityStreets>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }

        public virtual Countries Country { get; set; }
        public virtual ICollection<CityStreets> CityStreets { get; set; }
    }
}
