using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CarRental.Web.ViewModels
{
    public class LocationsSubstringsViewModel
    {
        public string LocationsSubstrings { get; set; }
        public string[] LocationsSubstringsSplitted
        {
            get
            {
                var locationsSubstrings = LocationsSubstrings == null ? "" : LocationsSubstrings;
                return Regex.Split(locationsSubstrings, "[,;:./\\ ]+", RegexOptions.IgnoreCase)
                    .Where(location => location != "").ToArray();
            }
        }
    }
}
