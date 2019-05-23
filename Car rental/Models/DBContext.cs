using Microsoft.EntityFrameworkCore;

namespace Car_rental.Models
{
    public class DBContext : DbContext
    {
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Automobile> Automobiles { get; set; }
        public DbSet<Gearbox> Gearboxes { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Street> Streets { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<RentCompany> RentCompanies { get; set; }
        public DbSet<RentCompanyService> RentCompanyServices { get; set; }
        public DbSet<CityStreet> CityStreets { get; set; }

        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var rentCompanyServices = modelBuilder.Entity<RentCompanyService>();
            rentCompanyServices.HasKey(joinElement => new { joinElement.ServiceId, joinElement.RentCompanyId });
            var cityStreet = modelBuilder.Entity<CityStreet>();
            cityStreet.HasKey(smth => new { smth.CityId, smth.StreetId});
            /*
            rentCompanyServices
                .HasOne(smth => smth.RentCompany)
                .WithMany(smth => smth.Id)
                .HasForeignKey();
                */
        }
    }
}
