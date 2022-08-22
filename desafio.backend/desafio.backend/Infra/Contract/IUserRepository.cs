using desafio.backend.Entities;

namespace desafio.backend.Infra.Contract
{
    public interface IUserRepository
    {
        UserEntity GetByUserName(string userName);
    }
}
