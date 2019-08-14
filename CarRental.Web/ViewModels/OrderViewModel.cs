using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.Web.ViewModels
{
    public class OrderViewModel
    {
        public int CarID { get; set; }
        public string Username { get; set; }
        public DateTime BookedFrom { get; set; }
        public DateTime BookedTo { get; set; }
    }
}
