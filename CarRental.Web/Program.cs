using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.IdentityModel.Logging;

namespace CarRental.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IdentityModelEventSource.ShowPII = true;
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
