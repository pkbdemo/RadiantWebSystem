namespace BackendAPI.Services.IServices;

public interface IExampleService
{
    ExampleEntity QueryById(int userId);
    void AddExample(ExampleEntity exampleEntity);
    void UpdateExample(ExampleEntity exampleEntity);
    void DeleteExample(int userId);
    IList<decimal> QueryAll();
    PageModel<ExampleEntity> GetPageList(string? sortProperty, IMSConstants.SortDirection? sortDirection, int page, int pageSize, string? name, int? age);
}