using CarRental.DAL.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarRental.BL
{
    public static class Configurator
    {
        public static IServiceCollection AddBusiness(this IServiceCollection services)
        {
            //services.AddDbContext<CarRentalContext>();
            return services;
        }
    }
}
