using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_rental.Models
{
    public class ManufactoryContext : DbContext
    {
        public DbSet<Manufactory> Manufactories { get; set; }

        public ManufactoryContext()
        {

        }

        public ManufactoryContext(DbContextOptions<ManufactoryContext> options)
        {
            Database.EnsureCreated();
        }
    }
}
