using CarRental.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
        [ActionName("CascadeDropDown")]
        public IActionResult CountriesCitiesStreets()
        {
            ViewBag.Countries = DB.Countries;
            ViewBag.Cities = DB.Cities;
            ViewBag.Streets = DB.Streets;
            return View();
        }

        /*
        [HttpPost]
        [ActionName("GetCityList")]
        [Route("/Home/GetCityList")]
        public IActionResult GetCityList(int countryId)
        {
            ViewBag.Cities = new SelectList(DB.Countries.First(c => c.Id == countryId).Cities, "Id", "Name");
            return View();
        }
        */

        [HttpGet]
        public JsonResult GetCities(int id)
        {
            var cityList = DB.Cities
                .Where(x => x.Country.Id == id);
            return Json(new SelectList(cityList, "Id", "Name"));
        }

        public JsonResult GetStreets(int id)
        {
            var streetList = DB.CityStreets
                .Where(x => x.CityId == id)
                .Select(x => x.Street);
            return Json(new SelectList(streetList, "Id", "Name"));
        }
    }
}