using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
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
        public async Task<object> Token(Persons person)
        {
            var token = new AccountService().Token(person);
            return token;
        }

        [HttpPost("decode")]
        public async Task DecodeToken([FromHeader] string jwt)
        {
            new AccountService().DecodeToken(jwt);
        }

        [HttpPost("register")]
        public async Task<Persons> RegisterUser(RegisterViewModel registerViewModel)
        {
            var person = await new AccountService().RegisterUser(registerViewModel);
            return person;
        }
    }
}