using System.Threading.Tasks;
using Car_rental.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Car_rental.Controllers
{
    class AutomobileController : Controller
    {
        private AutomobileContext db;
        public AutomobileController(AutomobileContext context)
        {
            db = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await db.AutomobilesSet.ToListAsync());
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Automobile car)
        {
            db.AutomobilesSet.Add(car);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}