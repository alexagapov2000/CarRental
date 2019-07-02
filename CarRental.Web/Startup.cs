using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using CarRental.DAL.Models;
using React.AspNet;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using Microsoft.AspNetCore.Http;
using JavaScriptEngineSwitcher.ChakraCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace CarRental.Web
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            var securityKey = "abracadd_jasfkldjf_klanvfklcvjxdcfkldasf_jkdasflj_woifjdasfjkdsaf_kljvicoczvjlkdasfakjldsafklda_bra_2019";
            var symmetricSecurityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(securityKey));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = "smesk.in",
                        ValidAudience = "readers",
                        IssuerSigningKey = symmetricSecurityKey,
                    };
                });

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
            app.UseReact(config => {  });
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseWebpackDevMiddleware();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "DefaultApi",
                    template: "{controller}/{action}");
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
            });
        }
    }
}