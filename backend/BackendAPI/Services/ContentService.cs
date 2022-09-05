namespace BackendAPI.Services;

public class ContentService : IContentService
{
    private readonly IContentRepository _contentRepository;

    public ContentService(IContentRepository contentRepository)
    {
        this._contentRepository = contentRepository;
    }

    public IList<decimal> QueryAll()
    {
        return _contentRepository.QueryAll();
    }
}