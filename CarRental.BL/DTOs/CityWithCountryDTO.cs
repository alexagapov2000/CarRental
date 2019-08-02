using System;
using System.Collections.Generic;
using System.Text;

namespace CarRental.BL.DTOs
{
    public class CityWithCountryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CountryName { get; set; }
    }
}
