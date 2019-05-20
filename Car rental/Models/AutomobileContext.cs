using Microsoft.EntityFrameworkCore;

namespace Car_rental.Models
{
    public class AutomobileContext : DbContext
    {
        public DbSet<Automobile> AutomobilesSet { get; set; }

        public AutomobileContext(DbContextOptions<AutomobileContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
