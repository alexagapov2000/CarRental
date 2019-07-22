using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CarRental.BL.ViewModels
{
    public class RegisterViewModel
    {
        public string Username { get; set; }
        public string Password1 { get; set; }
        public string Password2 { get; set; }
    }
}
