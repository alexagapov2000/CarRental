using System;
using System.Collections.Generic;

namespace CarRental.Web.Models
{
    public partial class RentCompanyServices
    {
        public int RentCompanyId { get; set; }
        public int ServiceId { get; set; }

        public virtual RentCompanies RentCompany { get; set; }
        public virtual Services Service { get; set; }
    }
}
