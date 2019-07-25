using System;

namespace CarRental.CustomExceptions
{
    public class SameDataException : Exception
    {
        public SameDataException() : base() { }
        public SameDataException(string message) : base(message) { }
        public SameDataException(string message, Exception innerException) : base(message, innerException) { }
    }
}
