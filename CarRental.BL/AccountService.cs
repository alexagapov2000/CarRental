using CarRental.DAL;
using CarRental.DAL.Models;
using CarRental.DAL.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<object> DecodeToken(string token)
        {
            var validationParameters = new TokenValidationParameters()
            {
                ValidIssuer = _configuration["JwtIssuer"],
                ValidAudience = _configuration["JwtIssuer"],
                ClockSkew = System.TimeSpan.Zero,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]))
            };

            SecurityToken validatedToken;
            var username = "";
            var password = "";

            IEnumerable<string> roles = new List<string>();
            try
            {
                ClaimsPrincipal claims = new JwtSecurityTokenHandler().ValidateToken(token, validationParameters, out validatedToken);

                username = claims.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
                       .Select(c => c.Value).SingleOrDefault();
                password = claims.Claims.Where(c => c.Type == ClaimTypes.Email)
                                   .Select(c => c.Value).SingleOrDefault();
                roles = claims.Claims.Where(c => c.Type == ClaimTypes.Role)
                                   .Select(c => c.Value);
                return new { username, password, roles };
            }
            catch
            {
                return new { };
            }
        }
    }
}
