using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_rental.Models
{
    public class CityStreet
    {
        public int CityId { get; set; }
        public int StreetId { get; set; }

        public City City { get; set; }
        public Street Street { get; set; }
    }
}
