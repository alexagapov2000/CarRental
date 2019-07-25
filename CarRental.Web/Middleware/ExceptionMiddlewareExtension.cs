using CarRental.CustomExceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Security.Authentication;

namespace CarRental.Web
{
    public static class ExceptionMiddlewareExtension
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        context.Response.StatusCode = (int)GetErrorCode(contextFeature.Error);
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new Error
                        {
                            Message = contextFeature.Error.Message
                        }));
                    }
                });
            });
        }
        private static HttpStatusCode GetErrorCode(Exception exception)
        {
            switch (exception)
            {
                case ValidationException _:
                    return HttpStatusCode.BadRequest;
                case AuthenticationException _:
                    return HttpStatusCode.Forbidden;
                    
                    //deprecated
                case NotImplementedException _:
                    return HttpStatusCode.NotImplemented;
                    //deprecated

                case NotFoundException _:
                    return HttpStatusCode.NotFound;

                    //deprecated
                case SameDataException _:
                    return HttpStatusCode.Conflict;
                    //deprecated

                default:
                    return HttpStatusCode.InternalServerError;
            }
        }
    }
}
