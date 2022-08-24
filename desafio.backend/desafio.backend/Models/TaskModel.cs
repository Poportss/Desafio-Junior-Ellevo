using desafio.backend.Entities.Enums;
using System.Collections;
using System.Collections.Generic;

namespace desafio.backend.Models
{
    public class TaskModel
    {
        public string Id { get; set; }
        public string genratorId { get; set; }
        public string GeneratorName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Responsible { get; set; }
        public string ResponsibleName { get; set; }
        public ICollection<ActivityModel> Activitys { get; set; }
        public EStatus Status { get; set; }
       
    }
}
