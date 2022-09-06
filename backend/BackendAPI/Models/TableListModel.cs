namespace BackendAPI.Models;

public class WaterTemp
{
    public decimal Cool_input { get; set; }
    public decimal Cool_output { get; set; }
    public decimal Cool_down_input { get; set; }
    public decimal Cool_down_output { get; set; }
    public string? Upd_time { get; set; }
    public int? Machine_num { get; set; }
}