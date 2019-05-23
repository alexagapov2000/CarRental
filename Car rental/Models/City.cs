using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Car_rental.Models
{
    public class City
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        //public ICollection<Street> Streets { get; set; }
        public ICollection<RentCompany> RentCompanies { get; set; }
    }
}
