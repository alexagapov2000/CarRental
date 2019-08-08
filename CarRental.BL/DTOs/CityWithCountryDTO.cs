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

        public override string ToString()
        {
            return CountryName + ", " + Name;
        }

        public override bool Equals(object other)
        {
            return this.Id == ((CityWithCountryDTO)other).Id;
        }

        public override int GetHashCode()
        {
            return this.Id;
        }
    }
}
