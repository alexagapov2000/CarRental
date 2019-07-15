using CarRental.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;


namespace CarRental.DAL
{
    public class Person
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
    }
}