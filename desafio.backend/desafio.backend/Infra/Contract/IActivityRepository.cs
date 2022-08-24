using desafio.backend.Entities;
using System.Linq;

namespace desafio.backend.Infra.Contract
{
    public interface IActivityRepository
    {
        string GetGenerator(string genrator);
        string GetResponsable(string responsable);
        IQueryable<ActivityEntity> GetAll();
        ActivityEntity GetById(string id);
        ActivityEntity Create(ActivityEntity entity);

    }
}
