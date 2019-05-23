using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Car_rental.Models
{
    public class RentCompanyService
    {
        public int RentCompanyId { get; set; }
        public int ServiceId { get; set; }
        //public byte Order { get; set; }

        public RentCompany RentCompany { get; set; }
        public Service Service { get; set; }
    }
}
