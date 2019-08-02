using CarRental.BL.DTOs;
using CarRental.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace CarRental.BL
{
    public class CitiesService
    {
        public CarRentalContext _context { get; private set; }

        public CitiesService()
        {
            _context = new CarRentalContext();
        }

        public async Task<ActionResult<IEnumerable<Cities>>> GetCities(int? countryID)
        {
            if (countryID != null)
            {
                return await _context.Cities
                    .Where(city => city.CountryId == countryID)
                    .ToListAsync();
            }
            return await _context.Cities.ToListAsync();
        }

        public async Task<ActionResult<Cities>> GetCity(int id)
        {
            return await _context.Cities.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task AddCity(Cities city)
        {
            _context.Cities.Add(city);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Cities>> DeleteCity(int id, ControllerBase controller)
        {
            var city = await _context.Cities.FindAsync(id);

            if (city == null)
            {
                return controller.NotFound();
            }

            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();

            return city;
        }

        public async Task<IEnumerable<Cities>> DeleteCities(int[] IDs)
        {
            //map input data for intersection
            var pseudoCities = IDs.Select(id => new Cities { Id = id }).ToList();

            var cities = _context.Cities.Intersect(pseudoCities, new CitiesEqualityComparer());
            _context.Cities.RemoveRange(pseudoCities);
            await _context.SaveChangesAsync();
            return pseudoCities;
        }
        class CitiesEqualityComparer : IEqualityComparer<Cities>
        {
            public bool Equals(Cities x, Cities y)
            {
                return x.Id == y.Id;
            }

            public int GetHashCode(Cities city)
            {
                return city.Id;
            }
        }

        public IEnumerable<CityWithCountryDTO> GetCitiesWithCountries()
        {
            return _context.Cities
                .Join(_context.Countries,
                    city => city.CountryId,
                    country => country.Id,
                    (city, country) => new CityWithCountryDTO
                    {
                        Id = city.Id,
                        Name = city.Name,
                        CountryName = country.Name,
                    });
        }
    }
}
