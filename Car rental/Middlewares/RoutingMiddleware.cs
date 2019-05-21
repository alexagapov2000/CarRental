using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Car_rental
{
    public class RoutingMiddleware
    {
        private readonly RequestDelegate Next;
        public RoutingMiddleware(RequestDelegate next)
        {
            Next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            string path = context.Request.Path.Value.ToLower();
            if (path == "/index")
            {
                await context.Response.WriteAsync("Home Page");
            }
            else if (path == "/about")
            {
                await context.Response.WriteAsync("About");
            }
            else
            {
                context.Response.StatusCode = 404;
            }
        }
    }

    public static partial class AppCoreExtensions
    {
        public static void UseRoutingMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<RoutingMiddleware>();
        }
    }
}