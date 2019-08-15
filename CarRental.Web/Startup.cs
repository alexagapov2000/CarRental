using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using CarRental.DAL.Models;
using React.AspNet;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using Microsoft.AspNetCore.Http;
using JavaScriptEngineSwitcher.ChakraCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using CarRental.DAL.Models.Auth;
using Westwind.AspNetCore.LiveReload;
using CarRental.BL;
using StackifyMiddleware;

namespace CarRental.Web
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = AuthOptions.ISSUER,

                        ValidateAudience = true,
                        ValidAudience = AuthOptions.AUDIENCE,

                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),

                        ValidateLifetime = true,
                    };
                });

            services.AddLiveReload();
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
            app.UseDeveloperExceptionPage();

            app.UseReact(config => { });
            app.UseDefaultFiles();
            app.UseLiveReload();
            app.UseStaticFiles();
            app.UseWebpackDevMiddleware();
            app.UseAuthentication();
            app.ConfigureExceptionHandler();
            app.UseMiddleware<RequestTracerMiddleware>();
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