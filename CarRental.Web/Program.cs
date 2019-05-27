using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CarRental.Web.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CarRental.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var db = new CarRentalContext();
            db.Automobiles.Add(new Automobiles
            {
                Id = db.Automobiles.Count(),
                Name = "Solaris",
                FuelConsumption = 25,
                GearboxId = 2,
                ManufacturerId = 1,
            });
            //db.SaveChanges();
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
