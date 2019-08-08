using System;
using CarRental.DAL.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CarRental.DAL.Models
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

        public virtual DbSet<CarMarks> CarMarks { get; set; }
        public virtual DbSet<Cars> Cars { get; set; }
        public virtual DbSet<Cities> Cities { get; set; }
        public virtual DbSet<Countries> Countries { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
        public virtual DbSet<RentCompanies> RentCompanies { get; set; }
        public virtual DbSet<RentCompanyServices> RentCompanyServices { get; set; }
        public virtual DbSet<Services> Services { get; set; }

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
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<CarMarks>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Cars>(entity =>
            {
                entity.Property(e => e.Price).HasColumnType("money");

                entity.HasOne(d => d.CarMark)
                    .WithMany(p => p.Cars)
                    .HasForeignKey(d => d.CarMarkId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cars_CarMarks");

                entity.HasOne(d => d.RentCompany)
                    .WithMany(p => p.Cars)
                    .HasForeignKey(d => d.RentCompanyId)
                    .HasConstraintName("FK_Cars_RentCompanies");
            });

            modelBuilder.Entity<Cities>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cities_Countries");
            });

            modelBuilder.Entity<Countries>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.Property(e => e.BookedFrom).HasColumnType("date");

                entity.Property(e => e.BookedTo).HasColumnType("date");

                entity.HasOne(d => d.Car)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CarId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Orders_Cars");

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.PersonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Orders_Persons");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<RentCompanies>(entity =>
            {
                entity.Property(e => e.Adress)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.RentCompanies)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RentCompanies_Cities");
            });

            modelBuilder.Entity<RentCompanyServices>(entity =>
            {
                entity.HasKey(e => new { e.ServiceId, e.RentCompanyId })
                    .HasName("PK__RentComp__B8E1C8063A468639");

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
                    .HasMaxLength(500);
            });
        }
    }
}
