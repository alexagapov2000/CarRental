namespace CarRental.DAL.Models.Auth
{
    public class Person
    {
        public string Username { get; set; }
        //hash it
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
