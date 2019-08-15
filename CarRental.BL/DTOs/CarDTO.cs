using System;
using System.Collections.Generic;

namespace CarRental.BL.DTOs
{
    public class CarDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public string RentalCompanyName { get; set; }
        public int Seats { get; set; }
        public int FuelConsumption { get; set; }
        public int Count { get; set; }
    }

    public class CarDTOBuilder
    {
        private CarDTO resultObject { get; set; }
        public CarDTOBuilder SetCount(int count)
        {
            resultObject.Count = count;
            return this;
        }

        public static implicit operator CarDTO(CarDTOBuilder builder)
        {
            return builder.resultObject;
        }

        public CarDTO ToDTO()
        {
            return (CarDTO)this;
        }
        public static explicit operator CarDTOBuilder(CarDTO dto)
        {
            return new CarDTOBuilder { resultObject = dto };
        }
    }
}
