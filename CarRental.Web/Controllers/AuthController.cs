using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CarRental.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("token")]
        public ActionResult GetToken()
        {
            var securityKey = "this_is_our_supper_long_security_key_for_token_validation_project_2019_07_02$smesk.in";
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.EcdsaSha256Signature);
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            claims.Add(new Claim("Custom_Claim", "Kalovichok"));
            var token = new JwtSecurityToken(
                issuer: "smesk.in",
                audience: "readers",
                expires: DateTime.Now.AddHours(1),
                signingCredentials: signingCredentials);
            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            //return Ok(new Object[]{symmetricSecurityKey, signingCredentials, token});
        }

        [HttpPost("kal")]
        public ActionResult GetKal()
        {
            return Ok("kaliw");
        }
    }
}