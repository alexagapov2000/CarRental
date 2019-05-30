using System;
using System.Collections.Generic;

namespace CarRental.Web.Models
{
    public partial class Countries : INumerated
    {
        public Countries()
        {
            Cities = new HashSet<Cities>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Cities> Cities { get; set; }
    }
}
