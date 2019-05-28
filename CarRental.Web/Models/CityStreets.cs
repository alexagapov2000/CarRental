using System;
using System.Collections.Generic;

namespace CarRental.Web.Models
{
    public partial class CityStreets
    {
        public int CityId { get; set; }
        public int StreetId { get; set; }

        public virtual Cities City { get; set; }
        public virtual Streets Street { get; set; }
    }
}
