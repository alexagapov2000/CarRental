using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Car_rental.Models
{
    public class RentCompany
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        //public ICollection<Service> Services { get; set; }

        public int StreetNumber { get; set; }
    }
}
