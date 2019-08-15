using CarRental.BL.DTOs;
using CarRental.CustomExceptions;
using CarRental.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
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

        public async Task<ActionResult<Cities>> DeleteCity(int id)
        {
            var city = await _context.Cities.FindAsync(id);

            if (city == null)
                throw new NotFoundException($"There is no city with id: {id}");

            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();

            return city;
        }

        public async Task<IEnumerable<Cities>> DeleteCities(int[] IDs)
        {
            var citiesToDelete = from id in IDs
                                 join city in _context.Cities on id equals city.Id
                                 select city;
            _context.Cities.RemoveRange(citiesToDelete);
            await _context.SaveChangesAsync();
            return citiesToDelete;
        }

        public IEnumerable<CityWithCountryDTO> GetCitiesWithCountries(string[] locations)
        {
            var DTOs = _context.Cities
                .Join(_context.Countries,
                    city => city.CountryId,
                    country => country.Id,
                    (city, country) => new CityWithCountryDTO
                    {
                        Id = city.Id,
                        Name = city.Name,
                        CountryName = country.Name,
                    });
            IEnumerable<CityWithCountryDTO> result = null;
            if (locations.Count() == 0)
                result = DTOs;
            if (locations.Count() == 1)
                result = DTOs.Where(dto =>
                    locations.Any(location => dto.Name.Contains(location, StringComparison.OrdinalIgnoreCase)) ||
                    locations.Any(location => dto.CountryName.Contains(location, StringComparison.OrdinalIgnoreCase)));
            if (locations.Count() >= 2)
                result = DTOs.Where(dto =>
                    (dto.Name.Contains(locations[0], StringComparison.OrdinalIgnoreCase) &&
                    dto.CountryName.Contains(locations[1], StringComparison.OrdinalIgnoreCase)) ||
                    (dto.Name.Contains(locations[1], StringComparison.OrdinalIgnoreCase) &&
                    dto.CountryName.Contains(locations[0], StringComparison.OrdinalIgnoreCase)));
            return result.Take(11);
        }
    }
}
