using CarRental.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.Web.Middleware.CustomExceptions;

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

        public async Task<ActionResult<Countries>> AddCountry(Countries country)
        {
            _context.Countries.Add(country);
            await _context.SaveChangesAsync();

            return country;
        }

        public async Task<ActionResult<Countries>> DeleteCountry(int id)
        {
            var country = await _context.Countries.FindAsync(id);

            foreach (var city in _context.Cities.Where(x => x.CountryId == id))
                _context.Cities.Remove(city);

            await _context.SaveChangesAsync();

            if (country == null)
                throw new NotFoundException($"There is no country with id {id}");

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return country;
        }

        public async Task<IEnumerable<Countries>> DeleteCountries(int[] IDs)
        {
            var countries = new List<Countries>();

            foreach (var id in IDs)
            {
                var smth = await DeleteCountry(id);
                countries.Add(smth.Value);
            }

            await _context.SaveChangesAsync();
            return countries;
        }
    }
}
