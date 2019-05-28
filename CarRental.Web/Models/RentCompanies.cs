using System;
using System.Collections.Generic;

namespace CarRental.Web.Models
{
    public partial class RentCompanies
    {
        public RentCompanies()
        {
            RentCompanyServices = new HashSet<RentCompanyServices>();
        }

        public string Name { get; set; }
        public int StreetNumber { get; set; }
        public int CityId { get; set; }
        public int CountryId { get; set; }
        public int StreetId { get; set; }
        public int Id { get; set; }

        public virtual ICollection<RentCompanyServices> RentCompanyServices { get; set; }
    }
}
