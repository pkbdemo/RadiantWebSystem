namespace BackendAPI.Models;

public class PageModel<T>
{
    public IList<T>? Content { get; set; }
    public int? Total { get; set; }
}
