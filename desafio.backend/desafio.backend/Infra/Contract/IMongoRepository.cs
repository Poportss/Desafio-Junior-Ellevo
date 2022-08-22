using System.Collections.Generic;
using System.Linq;

namespace desafio.backend.Infra.Contract
{
    public interface IMongoRepository<T>
    {
        IQueryable<T> GetAll();
        T Get(string id);
        T Create(T user);
        void Update(string id, T user);
        void Remove(string id);
    }
}
