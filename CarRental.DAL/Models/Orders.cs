using CarRental.DAL.Models.Auth;
using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models
{
    public partial class Orders
    {
        public int Id { get; set; }
        public DateTime BookedFrom { get; set; }
        public DateTime BookedTo { get; set; }
        public int PersonId { get; set; }
        public int CarId { get; set; }

        public virtual Cars Car { get; set; }
        public virtual Person Person { get; set; }

        public static Orders MinValue
        {
            get
            {
                return new Orders
                {
                    Id = -1,
                    BookedFrom = DateTime.MinValue,
                    BookedTo = DateTime.MinValue,
                    PersonId = -1,
                    CarId = -1,
                };
            }
        }
    }
}
