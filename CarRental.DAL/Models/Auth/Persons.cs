using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models.Auth
{
    public partial class Person
    {
        public Person()
        {
            Orders = new HashSet<Orders>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public virtual ICollection<Orders> Orders { get; set; }
    }
}
