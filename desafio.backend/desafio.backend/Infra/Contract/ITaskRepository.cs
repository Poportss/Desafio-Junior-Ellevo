using desafio.backend.Entities;
using System.Linq;

namespace desafio.backend.Infra.Contract
{
    public interface ITaskRepository 
    {
        string GetGeneratorName(string genrator);
        string GetResponsableName(string responsable);
        IQueryable<TaskEntity> GetAll();
        TaskEntity GetById(string id);
        TaskEntity Create(TaskEntity entity);
        void Delete(string id);
        void Update (string id, TaskEntity entity);
    }
}
