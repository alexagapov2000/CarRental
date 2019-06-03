using CarRental.DAL.Models;
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
            return View(DB.Cars.ToList());
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Cars automobile)
        {
            DB.Cars.Add(automobile);
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
            var toRemove = DB.Cars.FirstOrDefault(car => car.Name == name);
            DB.Cars.Remove(toRemove);
            DB.SaveChanges();
            return View();
        }

        [HttpGet]
        [ActionName("CascadeDropDown")]
        public IActionResult CountriesCitiesStreets()
        {
            ViewBag.Countries = DB.Countries;
            ViewBag.Cities = DB.Cities;
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
    }
}