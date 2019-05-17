using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Car_rental.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Car_rental.Controllers
{
    class CarsController : Controller
    {

        private CarsContext db;
        public CarsController(CarsContext context)
        {
            db = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await db.Cars.ToListAsync());
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Car car)
        {
            db.Cars.Add(car);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}