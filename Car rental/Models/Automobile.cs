using System.ComponentModel.DataAnnotations;

namespace Car_rental.Models
{
    public class Automobile
    {
        [Key]
        public int Id { get; set; }
        public int Stars { get; set; }
        public string Model { get; set; }
    }
}
