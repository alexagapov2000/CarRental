using CarRental.DAL.Models;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult<IEnumerable<Cities>>> GetCities()
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

        [HttpPost]
        public async Task<ActionResult<Cities>> PostCities(Cities city)
        {
            _context.Cities.Add(city);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCountries", new { id = city.Id }, city);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Cities>> DeleteCities(int id)
        {
            var city = await _context.Cities.FindAsync(id);

            if (city == null)
            {
                return NotFound();
            }

            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();

            return city;
        }
    }
}