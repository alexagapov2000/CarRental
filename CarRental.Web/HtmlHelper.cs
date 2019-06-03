using CarRental.DAL;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace CarRental.Web
{
    public static class HtmlHelper
    {
        public static HtmlString CreateSelect(
            this IHtmlHelper html, IEnumerable<INamed> collection,
            string name, string child = null, string controller = null)
        {
            string result = $"<select name=\"{name}\" class=\"dropdown\" id=\"{name}\" onchange=\"smth('{name}', '{child}', '{controller}')\">\n";
            foreach (var item in collection)
            {
                result += $"<option value={item.Id}>{item.Name}</option>\n";
            }
            result += "</select>\n";
            return new HtmlString(result);
        }
    }
}
