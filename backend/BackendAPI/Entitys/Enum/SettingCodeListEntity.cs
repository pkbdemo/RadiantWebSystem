namespace BackendAPI.Entitys.Enum;

public class SettingCodeListEntity
{
    public string? Code_Id { get; set; }
    public string? Code_Name { get; set; }
    public string? Code_Extend_A { get; set; }
    public string? Code_Extend_B { get; set; }
    public string? Code_Extend_C { get; set; }
}
public class ReqSettingCodeName {
    public string? Kind_Id { get; set; }
    public string? Code_Extend_A { get; set; }
    public string? Code_Extend_B { get; set; }
    public string? Code_Extend_C { get; set; }
}