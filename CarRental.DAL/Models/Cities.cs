using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models
{
    public partial class Cities
    {
        public Cities()
        {
            RentCompanies = new HashSet<RentCompanies>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }

        public virtual Countries Country { get; set; }
        public virtual ICollection<RentCompanies> RentCompanies { get; set; }
    }
}
