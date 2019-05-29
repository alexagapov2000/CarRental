using CarRental.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmptyApp.Controllers
{
    public class HomeController : Controller
    {
        CarRentalContext DB { get; set; }

        public HomeController(CarRentalContext context)
        {
            DB = context;
        }

        public IActionResult Index()
        {
            return View(DB.Automobiles.ToList());
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Automobiles automobile)
        {
            DB.Automobiles.Add(automobile);
            DB.SaveChanges();
            return View();
        }

        [HttpGet]
        public IActionResult Remove()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Remove(string name)
        {
            var toRemove = DB.Automobiles.FirstOrDefault(car => car.Name == name);
            DB.Automobiles.Remove(toRemove);
            DB.SaveChanges();
            return View();
        }

        [HttpGet]
        public IActionResult CountriesCitiesStreets()
        {
            ViewBag.Countries = DB.Countries;
            ViewBag.Cities = DB.Cities;
            ViewBag.Streets = DB.Streets;
            return View();
        }

        [HttpPost]
        public IActionResult CountriesCitiesStreets(Countries country)
        {
            return View(country.Cities);
        }

        [HttpPost]
        public IActionResult CountriesCitiesStreets(Cities city)
        {
            var streets = city.CityStreets
                .Where(correspond => correspond.CityId == city.Id)
                .Select(correspond => correspond.Street);
            return View(streets);
        }
    }
}