namespace BackendAPI.Common;

public class IMSException : Exception
{
    public IMSException(string? message) : base(message)
    {
    }
}
