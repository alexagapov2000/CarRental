using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models
{
    public partial class Cars
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? RentCompanyId { get; set; }
        public DateTime? BookedBefore { get; set; }

        public virtual RentCompanies RentCompany { get; set; }
    }
}
