using CarRental.BL.DTOs;
using CarRental.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

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
        public bool IsDatesIntersects(Orders confirmedOrder, DateTime bookedFrom, DateTime bookedTo)
        {
            return !(
                confirmedOrder.BookedTo < bookedFrom ||
                bookedTo < confirmedOrder.BookedFrom);
        }

        public IEnumerable<IEnumerable<CarDTO>> GetCarsByCity(int cityId, DateTime bookedFrom, DateTime bookedTo)
        {
            var result = from car in _context.Cars
                         join rental in _context.RentCompanies on car.RentCompanyId.Value equals rental.Id
                         join model in _context.CarMarks on car.CarMarkId equals model.Id
                         join order in (from order in _context.Orders
                                        where IsDatesIntersects(order, bookedFrom, bookedTo)
                                        select order) on car.Id equals order.CarId into orders
                         from order in orders.DefaultIfEmpty()
                         where order == null
                         where rental.CityId == cityId
                         select new CarDTO
                         {
                             Id = car.Id,
                             Name = model.Name,
                             Price = car.Price,
                             RentalCompanyName = rental.Name,
                             FuelConsumption = model.FuelConsumption,
                             Seats = model.Seats,
                         } into dto
                         group dto by dto.Name into dtos
                         from dto in
                            (from dto in dtos
                             group dto by dto.RentalCompanyName into dtos2
                             select CarDTO.AddCount(dtos2.First(), dtos2.Count()))
                         group dto by dtos;
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

    public static class LINQExtensions
    {
        public static bool AllTrue<T>(this IEnumerable<T> collection, Func<T, bool> predicate)
        {
            foreach (var element in collection)
                if (!predicate(element))
                    return false;
            return true;
        }
    }
}
