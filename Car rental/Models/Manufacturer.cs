using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Car_rental.Models
{
    public class Manufacturer
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Automobile> Automobiles { get; set; }
    }
}
