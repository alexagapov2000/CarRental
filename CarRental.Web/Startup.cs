using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using CarRental.DAL.Models;
using React.AspNet;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using Microsoft.AspNetCore.Http;
using JavaScriptEngineSwitcher.ChakraCore;

namespace CarRental.Web
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddReact();
            services.AddJsEngineSwitcher(options => options.DefaultEngineName = ChakraCoreJsEngine.EngineName)
                .AddChakraCore();
            services.AddMvc();
            services.AddSpaStaticFiles();
            services.AddDbContext<CarRentalContext>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseReact(config => { });
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                name: "default",
                template: "{controller=countries}/{action=GetCountries}/{id?}");
            });
        }
    }
}