using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarRental.BL.DTOs;
using CarRental.BL.Services;
using CarRental.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        [HttpGet("pagination")]
        public async Task<IEnumerable<CarDTO>> GetCarsPage([FromQuery]int page, [FromQuery]int count)
        {
            var cars = new CarsService().GetCarsPage(page, count);
            return cars;
        }

        [HttpGet("pagesCount")]
        public async Task<int> GetPagesCount([FromQuery]int pageSize)
        {
            var result = new CarsService().GetPagesCount(pageSize);
            return result;
        }

        [HttpGet]
        public async Task<IEnumerable<IEnumerable<CarDTO>>> GetCarsByCity(
            [FromQuery]int cityId,
            [FromQuery]long bookedFromInMilliseconds,
            [FromQuery]long bookedToInMilliseconds)
        {
            var cars = new CarsService().GetCarsByCity(cityId, bookedFromInMilliseconds, bookedToInMilliseconds);
            return cars;
        }

        [HttpPost]
        public async Task<object> GetCarDTOs([FromBody]CityAndBookedRangeViewModel viewModel)
        {
            var result = new CarsService().GetCarDTOs(viewModel.CityId, viewModel.BookedFrom, viewModel.BookedTo);
            return result;
        }
    }

    public class CityAndBookedRangeViewModel
    {
        public int CityId { get; set; }
        public TimeSpan BookedFrom { get; set; }
        public TimeSpan BookedTo { get; set; }
    }
}