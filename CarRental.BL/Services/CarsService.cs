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
                    })
                .GroupBy(car => car.Name)
                .Select(selector)
                .ToList();
        }

        public IEnumerable<IEnumerable<CarDTO>> GetCarsByCity(int cityId, long bookedFromInMilliseconds, long bookedToInMilliseconds)
        {
            //timestamp
            //отправлять дату
            //post 
            //sql profiler
            //переделать с лямбд

            var bookedFrom = new DateTime(1970, 1, 1).AddMilliseconds(bookedFromInMilliseconds / 24 / 3600000 * 24 * 3600000);
            var bookedTo = new DateTime(1970, 1, 1).AddMilliseconds(bookedToInMilliseconds / 24 / 3600000 * 24 * 3600000);
            var rentals = _context.RentCompanies
                .Where(rental => rental.CityId == cityId);
            var rentalIDs = rentals
                .Select(rental => rental.Id)
                .ToHashSet();
            return _context.Cars
                .Where(car => rentalIDs.Contains(car.RentCompanyId.Value))
                .GetNotBookedCars(_context.Orders, bookedFrom, bookedTo)
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
                    Id = tuple.Item1.Id,
                    Name = _context.CarMarks.First(model => model.Id == tuple.Item1.CarMarkId).Name,
                    Price = tuple.Item1.Price,
                    RentalCompanyName = _context.RentCompanies.First(rental => rental.Id == tuple.Item1.RentCompanyId).Name,
                    FuelConsumption = _context.CarMarks.First(model => model.Id == tuple.Item1.CarMarkId).FuelConsumption,
                    Seats = _context.CarMarks.First(model => model.Id == tuple.Item1.CarMarkId).Seats,
                    Count = tuple.Item2,
                });
        }

        public object GetCarDTOs(int cityId, TimeSpan bookedFrom, TimeSpan bookedTo)
        {
            var result = from car in _context.Cars
                         join rental in _context.RentCompanies on car.RentCompanyId.Value equals rental.Id
                         join model in _context.CarMarks on car.CarMarkId equals model.Id
                         join o in _context.Orders on car.Id equals o.CarId into carsOrders
                         from order in carsOrders.DefaultIfEmpty()
                         where rental.CityId == cityId
                         orderby car.Price
                         select new CarDTO
                         {
                             Id = car.Id,
                             Name = model.Name,
                             Price = car.Price,
                             RentalCompanyName = rental.Name,
                             FuelConsumption = model.FuelConsumption,
                             Seats = model.Seats,
                         } into dto
                         group dto by dto.Name into dtosByModel
                         from dtosByModelByRentals in
                            (from dtoByRental in dtosByModel
                             group dtoByRental by dtoByRental.RentalCompanyName into dtosByRentalsByModels
                             select CarDTO.AddCount(dtosByRentalsByModels.First(), dtosByRentalsByModels.Count()))
                         group dtosByModelByRentals by dtosByModel;
            return result;
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

    static class LINQExtensions
    {
        public static IEnumerable<Cars> GetNotBookedCars(
            this IEnumerable<Cars> cars, IEnumerable<Orders> orders, DateTime bookedFrom, DateTime bookedTo)
        {
            var carIDsWithBookingHistory = new SortedDictionary<int, List<Tuple<DateTime, DateTime>>>();
            foreach (var car in cars)
                carIDsWithBookingHistory[car.Id] = new List<Tuple<DateTime, DateTime>>();
            foreach (var order in orders.Where(order => carIDsWithBookingHistory.ContainsKey(order.CarId)))
                carIDsWithBookingHistory[order.CarId].Add(Tuple.Create(order.BookedFrom, order.BookedTo));
            return carIDsWithBookingHistory
                .Where(pair => pair.Value.All(bookingRange =>
                    bookingRange.Item1 > bookedTo ||
                    bookingRange.Item2 < bookedFrom))
                .Select(pair => pair.Key)
                .Distinct()
                .Join(cars, id => id, car => car.Id, (id, car) => car);
        }
    }
}
