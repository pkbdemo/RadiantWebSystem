namespace BackendAPI.Common;

using System.Globalization;
using System.Text.Json.Serialization;

public class DateTimeJsonConverter : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateTime.ParseExact(reader.GetString(), IMSConstants.DatetimeFormat, CultureInfo.InvariantCulture);
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(IMSConstants.DatetimeFormat, CultureInfo.InvariantCulture));
    }
}
