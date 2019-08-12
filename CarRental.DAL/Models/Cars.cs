using System;
using System.Collections.Generic;

namespace CarRental.DAL.Models
{
    public partial class Cars
    {
        public Cars()
        {
            Orders = new HashSet<Orders>();
        }

        public int Id { get; set; }
        public int? RentCompanyId { get; set; }
        public int CarMarkId { get; set; }
        public decimal? Price { get; set; }

        public virtual CarMarks CarMark { get; set; }
        public virtual RentCompanies RentCompany { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
        /*
        public override bool Equals(object other)
        {
            try
            {
                return ((Cars)other).Id == this.Id;
            }
            catch
            {
                return false;
            }
        }

        public override int GetHashCode()
        {
            return this.Id;
        }
        */
    }

    public class CarsByRentalCompanyIdEqualityComparer : IEqualityComparer<Cars>
    {
        public bool Equals(Cars x, Cars y)
        {
            return x.RentCompanyId.Value == y.RentCompanyId.Value;
        }

        public int GetHashCode(Cars car)
        {
            return car.RentCompanyId.Value;
        }
    }
}
