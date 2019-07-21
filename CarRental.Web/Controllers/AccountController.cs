using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CarRental.BL;
using CarRental.BL.ViewModels;
using CarRental.DAL.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CarRental.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [HttpPost("token")]
        public async Task Token(Person person)
        {
            await new AccountService().Token(person, this);
        }

        [HttpPost("decode")]
        public async Task<ActionResult> DecodeToken([FromHeader] string jwt)
        {
            var person = await new AccountService().DecodeToken(jwt, this);
            return person;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Person>> RegisterUser(RegisterViewModel registerViewModel)
        {
            var person = await new AccountService().RegisterUser(registerViewModel, this);
            return person;
        }
    }
}