using System;
using System.Collections.Generic;

namespace CarRental.Web.Models
{
    public partial class RentCompanies
    {
        public string Name { get; set; }
        public int StreetNumber { get; set; }
        public int CityId { get; set; }
        public int CountryId { get; set; }
        public int StreetId { get; set; }
        public int Id { get; set; }
    }
}
