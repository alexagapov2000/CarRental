using CarRental.BL.ViewModels;
using CarRental.DAL;
using CarRental.DAL.Models;
using CarRental.DAL.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Person = CarRental.DAL.Models.Auth.Person;

namespace CarRental.BL
{
    public class AccountService
    {
        public CarRentalContext _context { get; private set; }
        private readonly IConfiguration _configuration;

        public AccountService()
        {
            _context = new CarRentalContext();
        }

        public async Task Token(Person person, ControllerBase controller)
        {
            var identity = GetIdentity(person.Username, person.Password);
            if (identity == null)
            {
                controller.Response.StatusCode = 400;
                await controller.Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromHours(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                JWTkey = encodedJwt,
                username = identity.Name,
            };

            controller.Response.ContentType = "application/json";
            await controller.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            var people = _context.Persons.ToList();
            var person = people.FirstOrDefault(x =>
                x.Username.TrimEnd() == username &&
                x.Password.TrimEnd() == password);
            if (person == null) return null;
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, person.Username),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role.TrimEnd())
            };
            var claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }

        public async Task<ActionResult> DecodeToken(string jwt, ControllerBase controller)
        {
            var validationParameters = new TokenValidationParameters()
            {
                ValidIssuer = AuthOptions.ISSUER,
                ValidAudience = AuthOptions.AUDIENCE,
                ClockSkew = System.TimeSpan.Zero,
                IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            };
            var handler = new JwtSecurityTokenHandler();
            SecurityToken validatedToken;
            IEnumerable<string> roles = new List<string>();
            try
            {
                ClaimsPrincipal claims = handler.ValidateToken(jwt, validationParameters, out validatedToken);
                return controller.Ok();
            }
            catch
            {
                return controller.ValidationProblem();
            }
        }

        public async Task<ActionResult<Person>> RegisterUser(RegisterViewModel registerViewModel, ControllerBase controller)
        {
            //front
            if (registerViewModel.Password1 != registerViewModel.Password2)
                return controller.BadRequest();
            if (_context.Persons.Any(p => p.Username == registerViewModel.Username))
                return controller.StatusCode(409);
            var person = new Person
            {
                Username = registerViewModel.Username,
                Password = registerViewModel.Password1,
                Role = "user",
            };
            await _context.Persons.AddAsync(person);
            _context.SaveChanges();
            return person;
        }
    }
}
