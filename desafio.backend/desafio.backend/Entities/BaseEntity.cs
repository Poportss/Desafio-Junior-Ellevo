using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace desafio.backend.Entities
{
    public class BaseEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public bool Deleted { get; set; }
    }
}
