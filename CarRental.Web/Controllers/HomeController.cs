using CarRental.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmptyApp.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Errors(string errCode)
        {
            switch(errCode)
            {
                case "401":
                case "403":
                case "404":
                case "500":
                case "502":
                case "503":
                case "504":
                    return View($"~/Views/Shared/Errors/{errCode}.cshtml");
                default: return Error();
            }
        }

        public IActionResult Errors(int errCode)
        {
            return Errors(errCode.ToString());
        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Errors/General.cshtml");
        }
    }
}