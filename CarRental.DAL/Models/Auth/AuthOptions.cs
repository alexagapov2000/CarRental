using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarRental.DAL.Models
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer";
        public const string AUDIENCE = "https://localhost:5001/";
        const string KEY = "adsnkxcvoiqrwtu293857r89oifjexdznscmxznckjqp39r3298ur9ifdsfjxcznvHDSJAKFH894892Y58934RUEJRHSDJKFHDSFKLJD134";
        public const int LIFETIME = 1;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
