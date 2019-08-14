using CarRental.BL.DTOs;
using CarRental.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.BL.Services
{
    public class CarsService
    {
        public CarRentalContext _context { get; private set; }

        public CarsService()
        {
            _context = new CarRentalContext();
        }

        public static Func<CarDTO, IComparable> GetPropertyToSort(string orderbyPropertyName)
        {
            switch (orderbyPropertyName.ToLower())
            {
                case "price": return car => car.Price;
                case "name": return car => (car.Name, car.RentalCompanyName);
                case "seats": return car => (car.Seats, car.Name, car.RentalCompanyName);
                case "rental": return car => car.RentalCompanyName;
                case "fuel": return car => (car.FuelConsumption, car.Name, car.RentalCompanyName);
                default: return car => car.Price;
            }
        }

        private bool IsDatesIntersects(Orders confirmedOrder, DateTime bookedFrom, DateTime bookedTo)
        {
            return !(
                confirmedOrder.BookedTo.Day < bookedFrom.Day ||
                bookedTo.Day < confirmedOrder.BookedFrom.Day);
        }

        public IEnumerable<IEnumerable<CarDTO>> GetCarsByCity(
            int cityId, DateTime bookedFrom, DateTime bookedTo,
            int pageNumber, int pageSize,
            Func<CarDTO, IComparable> orderbyProperty, bool isDescending)
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
                             Seats = model.Seats
                         };
            return GroupCars(result, orderbyProperty)
                .Select(group => group.Order(orderbyProperty, isDescending))
                .Order(group => orderbyProperty(group.First()), isDescending)
                .Skip(pageNumber * pageSize)
                .Take(pageSize);
        }

        private static IEnumerable<IEnumerable<CarDTO>> GroupCars(IQueryable<CarDTO> cars, Func<CarDTO, IComparable> keySelector)
        {
            var result = from dto in cars
                         group dto by dto.Name into dtos
                         from dto in
                            (from dto in dtos
                             group dto by dto.RentalCompanyName into dtos2
                             select dtos2.First().SetCount(dtos2.Count()))
                         group dto by dtos;
            return result;
        }

        public async Task<bool> SubmitPurchase(string username, int carID, DateTime bookedFrom, DateTime bookedTo)
        {
            var person = _context.Persons.FirstOrDefault(p => p.Username == username);
            if (person == null)
                throw new Exception("This person does not exist!");
            var result = new Orders
            {
                PersonId = person.Id,
                CarId = carID,
                BookedFrom = bookedFrom,
                BookedTo = bookedTo,
            };
            var conflictOrder = _context.Orders
                .Where(order => order.CarId == carID)
                .FirstOrDefault(order => IsDatesIntersects(order, bookedFrom, bookedTo));
            if (conflictOrder != null)
                throw new Exception($"This car is already booked from {conflictOrder.BookedFrom.ToShortDateString()} to {conflictOrder.BookedTo.ToShortDateString()}");
            await _context.Orders.AddAsync(result);
            return await _context.SaveChangesAsync() == 1;
        }
    }

    public static class LINQExtensions
    {
        public static IOrderedEnumerable<T> Order<T, TKey>(this IEnumerable<T> collection, Func<T, TKey> keySelector, bool isDescending)
        {
            if (isDescending)
                return collection.OrderByDescending(keySelector);
            return collection.OrderBy(keySelector);
        }
    }
}
