using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.Web.Models
{
    public interface INumeratedEntity
    {
        int Id { get; set; }
        string Name { get; set; }
    }
}
