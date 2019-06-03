using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models
{
    public partial class Services
    {
        public Services()
        {
            RentCompanyServices = new HashSet<RentCompanyServices>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Cost { get; set; }

        public virtual ICollection<RentCompanyServices> RentCompanyServices { get; set; }
    }
}
