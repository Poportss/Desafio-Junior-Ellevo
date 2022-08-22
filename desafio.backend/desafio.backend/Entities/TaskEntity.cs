using desafio.backend.Entities.Enums;
using desafio.backend.Models;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace desafio.backend.Entities
{
    [BsonDiscriminator("Task")]
    public class TaskEntity : BaseEntity
    {

        public EStatus ChangeStatus(EStatus Status)
        {
            switch (Status)
            {
                case EStatus.NotStarted:
                    Status = EStatus.NotStarted;
                    break;
                case EStatus.InProgress:
                    Status = EStatus.InProgress;
                    break;
                case EStatus.Waiting:
                    Status = EStatus.Waiting;
                    break;
                case EStatus.Completed:
                    Status = EStatus.Completed;
                    break;
            }

            return Status;
        }

        [BsonElement("Genrator")]
        public string Genrator { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("Responsible")]
        public string Responsible { get; set; }

        [BsonElement("Status")]
        public EStatus Status { get; set; }

    }
}
