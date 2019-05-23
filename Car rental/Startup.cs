using Car_rental.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Car_rental
{
    public class Startup
    {
        /*
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
        */

        /*
            string Name;
            public Startup()
            {
                Name = "Startup name";
            }

            public void ConfigureServices(IServiceCollection services)
            {
            }

            public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            {


                app.Run(async (context) =>
                {
                    await context.Response.WriteAsync($"Hello, {Name}");
                });
            }
        */

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            string connection = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<DBContext>(options =>
                options.UseSqlServer(connection));
            services.AddMvc();
            services.AddDirectoryBrowser();
        }

        /*
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseDirectoryBrowser();
            //app.UseDefaultFiles();
            app.UseStaticFiles();
            

            //app.UseAutenticationMiddleware();
            //app.UseRoutingMiddleware();

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync($"Hello, world!");
            });
        }����
        */

        public void Configure(IApplicationBuilder app)
        {
            app.UseOwin(pipeline =>
            {
                pipeline(next => SendResponseAsync);
            });
        }

        public Task SendResponseAsync(IDictionary<string, object> environment)
        {
            // ���������� �����
            string responseText = "Hello ASP.NET Core";
            // �������� ��� � ������ ������
            byte[] responseBytes = Encoding.UTF8.GetBytes(responseText);

            // �������� ����� ������
            var responseStream = (Stream)environment["owin.ResponseBody"];
            // �������� ������
            return responseStream.WriteAsync(responseBytes, 0, responseBytes.Length);
        }
    }
}
