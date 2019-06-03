using CarRental.DAL;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.Web.Extensions
{
    public static class INumeratedExtensions
    {
        public static SelectList ToSelectList(this IEnumerable<INamed> collection)
        {
            return new SelectList(collection, "Id", "Name");
        }
    }
}
