using System;
using System.Collections.Generic;

namespace CarRental.Web.Models
{
    public partial class Streets
    {
        public Streets()
        {
            CityStreets = new HashSet<CityStreets>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<CityStreets> CityStreets { get; set; }
    }
}
