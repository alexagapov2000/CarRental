using CarRental.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRental.BL
{
    public class CountriesService
    {
        public CarRentalContext _context { get; private set; }

        public CountriesService()
        {
            _context = new CarRentalContext();
        }

        public async Task<ActionResult<IEnumerable<Countries>>> GetCountries()
        {
            return await _context.Countries.ToListAsync();
        }

        public async Task<ActionResult<Countries>> GetCountry(int id)
        {
            return await _context.Countries.FirstAsync(x => x.Id == id);
        }

        public async Task<ActionResult<Countries>> AddCountry(Countries countries, ControllerBase controller)
        {
            _context.Countries.Add(countries);
            await _context.SaveChangesAsync();

            return controller.CreatedAtAction("GetCountries", new { id = countries.Id }, countries);
        }

        public async Task<ActionResult<Countries>> DeleteCountry(int id, ControllerBase controller)
        {
            var country = await _context.Countries.FindAsync(id);

            foreach (var city in _context.Cities.Where(x => x.CountryId == id))
                _context.Cities.Remove(city);

            await _context.SaveChangesAsync();

            if (country == null)
            {
                return controller.NotFound();
            }

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return country;
        }

        public async Task<IEnumerable<Countries>> DeleteCountries(int[] IDs, ControllerBase controller)
        {
            var countries = new List<Countries>();

            foreach (var id in IDs)
            {
                var smth = await DeleteCountry(id, controller);
                countries.Add(smth.Value);
            }

            await _context.SaveChangesAsync();
            return countries;
        }
    }
}
