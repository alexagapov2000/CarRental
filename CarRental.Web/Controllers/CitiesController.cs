using CarRental.BL;
using CarRental.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cities>>> GetCities([FromQuery]int? countryID)
        {
            var cities = await new CitiesService().GetCities(countryID);
            return cities;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cities>> GetCity(int id)
        {
            var city = await new CitiesService().GetCity(id);
            return city;
        }

        [HttpPost]
        public async Task<ActionResult<Cities>> AddCity(Cities city)
        {
            await new CitiesService().AddCity(city);
            return city;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Cities>> DeleteCity(int id)
        {
            var city = await new CitiesService().DeleteCity(id, this);
            return city;
        }

        [HttpDelete]
        public async Task<IEnumerable<Cities>> DeleteCities([FromBody] int[] IDs)
        {
            var cities = await new CitiesService().DeleteCities(IDs);
            return cities;
        }
    }
}