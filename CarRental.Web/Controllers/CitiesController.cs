using CarRental.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly CarRentalContext _context;

        public CitiesController(CarRentalContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cities>>> GetCountries()
        {
            return await _context.Cities.ToListAsync();
        }

        [HttpGet("{countryID}")]
        public async Task<ActionResult<IEnumerable<Cities>>> GetCities(int countryID)
        {
            return await _context.Cities
                .Where(city => city.CountryId == countryID)
                .ToListAsync();
        }
    }
}