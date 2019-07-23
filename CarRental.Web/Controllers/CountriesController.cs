using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarRental.DAL.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using CarRental.Web.Controllers;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using CarRental.BL;

namespace CarRental.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Countries>>> GetCountries()
        {
            var countries = await new CountriesService().GetCountries();
            return countries;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Countries>> GetCountry(int id)
        {
            var country = await new CountriesService().GetCountry(id);
            return country;
        }

        [HttpPost]
        public async Task<ActionResult<Countries>> AddCountry(Countries country)
        {
            await new CountriesService().AddCountry(country);
            return country;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Countries>> DeleteCountry(int id)
        {
            var country = await new CountriesService().DeleteCountry(id);
            return country;
        }

        [HttpDelete]
        public async Task<IEnumerable<Countries>> DeleteCountries([FromBody] int[] IDs)
        {
            var countries = await new CountriesService().DeleteCountries(IDs);
            return countries;
        }
    }
}