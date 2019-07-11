using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace CarRental.DAL.Models.Auth
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer";
        public const string AUDIENCE = "https://localhost:5001/";
        const string KEY = "adsnkxcvoiqrwtu293857r89oifjexdznscmxznckjqp39r3298ur9ifdsfjxcznvHDSJAKFH894892Y58934RUEJRHSDJKFHDSFKLJD134";
        public const int LIFETIME = 24;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
