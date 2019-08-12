using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarRental.BL.DTOs;
using CarRental.BL.Services;
using CarRental.DAL.Models;
using CarRental.Web.ViewModels;
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

        [HttpPost]
        public async Task<IEnumerable<IEnumerable<CarDTO>>> GetCarsByCity([FromBody]CityAndBookedRangeViewModel cityAndBookedRange)
        {
            var cars = new CarsService().GetCarsByCity(
                cityAndBookedRange.CityId,
                cityAndBookedRange.BookedFrom,
                cityAndBookedRange.BookedTo);
            return cars;
        }
    }
}