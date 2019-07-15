using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarRental.DAL.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using CarRental.Web.Controllers;
using System.Linq;

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

        [HttpGet("{id}")]
        public async Task<ActionResult<Countries>> GetCountries(int id)
        {
            return await _context.Countries.FirstAsync(x => x.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult<Countries>> PostCountries(Countries countries)
        {
            _context.Countries.Add(countries);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCountries", new { id = countries.Id }, countries);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Countries>> DeleteCountries(int id)
        {
            var country = await _context.Countries.FindAsync(id);
            /*
            foreach(var city in _context.Cities.Where(x => x.CountryId == id))
            {
                await new CitiesController(_context).DeleteCities(city.Id);
                //_context.Cities.Remove(city);
            }
            */
            await _context.SaveChangesAsync();
            
            if (country == null)
            {
                return NotFound();
            }

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return country;
        }

        [HttpDelete("delete")]
        public async Task<IEnumerable<Countries>> DeleteCountries([FromBody] int[] IDs)
        {
            //map input data for intersection
            var pseudoCountries = IDs.Select(id => new Countries{Id = id});

            var countries = _context.Countries.Intersect(pseudoCountries, new CountriesEqualityComparer());
            _context.Countries.RemoveRange(pseudoCountries);
            await _context.SaveChangesAsync();
            return pseudoCountries;
        }
    }
}