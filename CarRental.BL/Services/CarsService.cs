using CarRental.BL.DTOs;
using CarRental.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace CarRental.BL.Services
{
    public class CarsService
    {
        public CarRentalContext _context { get; private set; }

        public CarsService()
        {
            _context = new CarRentalContext();
        }

        public IEnumerable<CarDTO> GetCars()
        {
            Func<IGrouping<string, CarDTO>, CarDTO> selector = group =>
            {
                var firstCar = group.First();
                firstCar.Count = group.Count();
                return firstCar;
            };
            return _context.Cars
                .Join(_context.CarMarks,
                    car => car.CarMarkId,
                    carMark => carMark.Id,
                    (car, carMark) => new CarDTO
                    {
                        Id = car.Id,
                        Name = carMark.Name,
                        Price = car.Price,
                        Seats = carMark.Seats,
                        BookedBefore = car.BookedBefore,
                    })
                .GroupBy(car => car.Name)
                .Select(selector)
                .ToList();
        }

        public IEnumerable<IEnumerable<CarDTO>> GetCarsByCity(int cityId)
        {
            var rentals = _context.RentCompanies
                .Where(rental => rental.CityId == cityId);
            var rentalIDs = rentals
                .Select(rental => rental.Id)
                .ToHashSet();
            return _context.Cars
                .Where(car => rentalIDs.Contains(car.RentCompanyId.Value))
                .GroupBy(car => car.CarMarkId)
                .Select(group => group.GroupBy(car => car.RentCompanyId))
                .Select(groups => groups.Select(group => Tuple.Create(group.First(), group.Count())))
                .Select(sameCars => ToDTO(sameCars))
                .Select(sameCars => sameCars.OrderBy(car => car.Price))
                .ToArray()
                .OrderBy(sameCars => sameCars.First().Price);
        }

        private IEnumerable<CarDTO> ToDTO(IEnumerable<Tuple<Cars, int>> sameCars)
        {
            return sameCars
                .Select(tuple => new CarDTO
                {
                    Name = _context.CarMarks.First(model => model.Id == tuple.Item1.CarMarkId).Name,
                    Price = tuple.Item1.Price,
                    RentalCompanyName = _context.RentCompanies.First(rental => rental.Id == tuple.Item1.RentCompanyId).Name,
                    FuelConsumption = _context.CarMarks.First(model => model.Id == tuple.Item1.CarMarkId).FuelConsumption,
                    Seats = _context.CarMarks.First(model => model.Id == tuple.Item1.CarMarkId).Seats,
                    Count = tuple.Item2,
                });
        }

        public IEnumerable<CarDTO> GetCarsPage(int page, int count)
        {
            return GetCars()
                .Skip(page * count)
                .Take(count)
                .ToList();
        }

        public int GetPagesCount(int pageSize)
        {
            return GetCars().Count() / pageSize;
        }
    }
}
