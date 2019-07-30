using System.Collections.Generic;
using System.Threading.Tasks;
using CarRental.BL.Services;
using CarRental.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cars>>> GetCars()
        {
            var cars = new CarsService().GetCars();
            return cars;
        }
    }
}