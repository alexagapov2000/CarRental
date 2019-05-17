using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_rental.Models
{
    public class Car
    {
        public int Id { get; set; }
        public int Stars { get; set; }
        public string Model { get; set; }
        public Manufactory Manufactory { get; set; }
    }
}
