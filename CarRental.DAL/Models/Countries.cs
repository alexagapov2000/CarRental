using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models
{
    public partial class Countries
    {
        public Countries()
        {
            Cities = new HashSet<Cities>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Cities> Cities { get; set; }
    }

    public class CountriesEqualityComparer : IEqualityComparer<Countries>
    {
        public int GetHashCode(Countries country)
        {
            return country.Id;
        }

        public bool Equals(Countries c1, Countries c2) {
            return c1.Id == c2.Id;
        }
    }
}
