using Microsoft.EntityFrameworkCore;

namespace Car_rental.Models
{
    public class CarsContext : DbContext
    {
        public DbSet<Car> Cars { get; set; }

        public CarsContext(DbContextOptions<CarsContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
