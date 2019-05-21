using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Car_rental
{
    public class AuthenticationMiddleware
    {
        private RequestDelegate Next;
        public AuthenticationMiddleware(RequestDelegate next)
        {
            Next = next;
        }
        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Query["token"];
            if (string.IsNullOrWhiteSpace(token))
            {
                context.Response.StatusCode = 403;
            }
            else
            {
                await Next.Invoke(context);
            }
        }
    }

    public static partial class AppCoreExtensions
    {
        public static void UseAutenticationMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<AuthenticationMiddleware>();
        }
    }
}
