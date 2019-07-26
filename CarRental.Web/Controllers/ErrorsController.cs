using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Web.Controllers
{
    public class ErrorsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}