using CarRental.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CarRental.BL.Services
{
    public class CarsService
    {
        public CarRentalContext _context { get; private set; }

        public CarsService()
        {
            _context = new CarRentalContext();
        }

        public ActionResult<IEnumerable<Cars>> GetCars()
        {
            var cars = _context.Cars.ToList();
            return cars;
        }
    }
}
