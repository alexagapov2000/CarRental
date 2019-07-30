using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models
{
    public partial class RentCompanies
    {
        public RentCompanies()
        {
            Cars = new HashSet<Cars>();
            RentCompanyServices = new HashSet<RentCompanyServices>();
        }

        public string Name { get; set; }
        public int CityId { get; set; }
        public int Id { get; set; }
        public string Adress { get; set; }

        public virtual Cities City { get; set; }
        public virtual ICollection<Cars> Cars { get; set; }
        public virtual ICollection<RentCompanyServices> RentCompanyServices { get; set; }
    }
}
