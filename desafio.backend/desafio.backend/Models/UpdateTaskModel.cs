using desafio.backend.Entities.Enums;

namespace desafio.backend.Models
{
    public class UpdateTaskModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Responsible { get; set; }
        public string Activity { get; set; }
        public EStatus Status { get; set; }
    }
}
