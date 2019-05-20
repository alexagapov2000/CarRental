using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Car_rental.Models;

namespace Car_rental.Views
{
    public class IndexCarModel : PageModel
    {
        private readonly Car_rental.Models.AutomobileContext _context;

        public IndexCarModel(Car_rental.Models.AutomobileContext context)
        {
            _context = context;
        }

        public IList<Automobile> Car { get;set; }

        public async Task OnGetAsync()
        {
            Car = await _context.AutomobilesSet.ToListAsync();
        }
    }
}
