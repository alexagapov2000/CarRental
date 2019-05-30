using CarRental.Web.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.Web.Extensions
{
    public static class INumeratedExtensions
    {
        public static SelectList ToSelectList(this IEnumerable<INumerated> collection)
        {
            return new SelectList(collection, "Id", "Name");
        }
    }
}
