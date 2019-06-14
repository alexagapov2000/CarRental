using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarRental.DAL.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly CarRentalContext _context;

        public CountriesController(CarRentalContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Countries>>> GetCountries()
        {
            return await _context.Countries.ToListAsync();
        }
    }
}
