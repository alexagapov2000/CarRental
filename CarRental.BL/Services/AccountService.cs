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
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Person = CarRental.DAL.Models.Auth.Person;

namespace CarRental.BL
{
    public class AccountService
    {
        public CarRentalContext _context { get; private set; }

        public AccountService()
        {
            _context = new CarRentalContext();
        }

        public object Token(Person person)
        {
            var identity = GetIdentity(person.Username, person.Password);
            if (identity == null)
                throw new ValidationException("Invalid username or password.");

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
                jwtKey = encodedJwt,
                username = identity.Name,
            };

            return response;
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

        public void DecodeToken(string jwt)
        {
            var validationParameters = new TokenValidationParameters()
            {
                ValidIssuer = AuthOptions.ISSUER,
                ValidAudience = AuthOptions.AUDIENCE,
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            };
            var handler = new JwtSecurityTokenHandler();
            var roles = new List<string>();
            handler.ValidateToken(jwt, validationParameters, out _);
        }

        public async Task<Person> RegisterUser(RegisterViewModel registerViewModel)
        {
            //front
            if (registerViewModel.Password1 != registerViewModel.Password2)
                throw new ValidationException("Passwords is not match!");
            if (_context.Persons.Any(p => p.Username == registerViewModel.Username))
                throw new ValidationException("This username is busy!");
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
