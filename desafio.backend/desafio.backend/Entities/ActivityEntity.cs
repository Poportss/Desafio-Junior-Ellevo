using MongoDB.Bson.Serialization.Attributes;

namespace desafio.backend.Entities
{
    [BsonDiscriminator("Activity")]
    public class ActivityEntity: BaseEntity
    {
        [BsonElement("Activity")]
        public string Activity { get; set; }

        [BsonElement("TaskId")]
        public string TaskId { get; set; }
    }


}
