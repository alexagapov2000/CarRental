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
        [HttpPost]
        public async Task<IEnumerable<IEnumerable<CarDTO>>> GetCarsByCity(
            [FromBody]CityAndBookedRangeViewModel cityAndBookedRange,
            [FromQuery]int pageNumber,
            [FromQuery]int pageSize,
            [FromQuery]string orderbyPropertyName,
            [FromQuery]bool isDescendingSort)
        {
            var cars = new CarsService().GetCarsByCity(
                cityAndBookedRange.CityId, cityAndBookedRange.BookedFrom, cityAndBookedRange.BookedTo,
                pageNumber, pageSize,
                CarsService.GetPropertyToSort(orderbyPropertyName), isDescendingSort);
            return cars;
        }

        [HttpPost("submit")]
        public async Task<bool> SubmitPurchase([FromBody]OrderViewModel order)
        {
            var result = await new CarsService().SubmitPurchase(order.Username, order.CarID, order.BookedFrom, order.BookedTo);
            return result;
        }
    }
}