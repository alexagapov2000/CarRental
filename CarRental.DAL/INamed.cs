using System;
using System.Collections.Generic;
using System.Text;

namespace CarRental.DAL
{
    public interface INamed
    {
        int Id { get; set; }
        string Name { get; set; }
    }
}
