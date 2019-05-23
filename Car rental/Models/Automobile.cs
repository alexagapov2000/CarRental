﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Car_rental.Models
{
    public class Automobile
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int FuelConsumption { get; set; }


    }
}
