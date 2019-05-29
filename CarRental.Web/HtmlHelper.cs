using CarRental.Web.Models;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace CarRental.Web
{
    public static class HtmlHelper
    {
        public static HtmlString CreateSelect(this IHtmlHelper html, IEnumerable<INumeratedEntity> collection, string name)
        {
            string result = $"<select name={name} onchange=\"this.form.submit()\"";
            foreach (var item in collection)
            {
                result += $"<option value={item.Id}>{item.Name}</option>";
            }
            result += "</select>";
            return new HtmlString(result);
        }
    }
}
