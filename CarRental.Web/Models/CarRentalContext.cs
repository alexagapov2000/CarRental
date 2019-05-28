using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CarRental.Web.Models
{
    public partial class CarRentalContext : DbContext
    {
        public CarRentalContext()
        {
        }

        public CarRentalContext(DbContextOptions<CarRentalContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Automobiles> Automobiles { get; set; }
        public virtual DbSet<Cities> Cities { get; set; }
        public virtual DbSet<CityStreets> CityStreets { get; set; }
        public virtual DbSet<Countries> Countries { get; set; }
        public virtual DbSet<Firms> Firms { get; set; }
        public virtual DbSet<Gearboxes> Gearboxes { get; set; }
        public virtual DbSet<RentCompanies> RentCompanies { get; set; }
        public virtual DbSet<RentCompanyServices> RentCompanyServices { get; set; }
        public virtual DbSet<Services> Services { get; set; }
        public virtual DbSet<Streets> Streets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=WSC-165-71\\SQLEXPRESS01;Initial Catalog=CarRental;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<Automobiles>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<Cities>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cities_Countries");
            });

            modelBuilder.Entity<CityStreets>(entity =>
            {
                entity.HasKey(e => new { e.StreetId, e.CityId });

                entity.HasOne(d => d.City)
                    .WithMany(p => p.CityStreets)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CityStreets_Cities");

                entity.HasOne(d => d.Street)
                    .WithMany(p => p.CityStreets)
                    .HasForeignKey(d => d.StreetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CityStreets_Streets");
            });

            modelBuilder.Entity<Countries>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<Firms>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<Gearboxes>(entity =>
            {
                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<RentCompanies>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<RentCompanyServices>(entity =>
            {
                entity.HasKey(e => new { e.ServiceId, e.RentCompanyId })
                    .HasName("PK__tmp_ms_x__B8E1C806DF79AE24");

                entity.HasOne(d => d.RentCompany)
                    .WithMany(p => p.RentCompanyServices)
                    .HasForeignKey(d => d.RentCompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RentCompanyServices_RentCompanies");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.RentCompanyServices)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RentCompanyServices_Services");
            });

            modelBuilder.Entity<Services>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<Streets>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);
            });
        }
    }
}
