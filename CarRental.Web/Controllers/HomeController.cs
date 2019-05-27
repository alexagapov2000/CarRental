using CarRental.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

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
        public void Create(Automobiles automobile)
        {
            DB.Automobiles.Add(automobile);
            DB.SaveChanges();
        }
    }
}