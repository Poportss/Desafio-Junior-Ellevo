using desafio.backend.Entities;
using desafio.backend.Infra.Contract;
using System.Linq;

namespace desafio.backend.Infra
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoRepository<UserEntity> _userRepository;

        public UserRepository(IMongoRepository<UserEntity> userRepository)
        {
            _userRepository = userRepository;
        }

        public UserEntity GetByUserName(string userName)
        {
            return _userRepository.GetAll().FirstOrDefault(p => p.User == userName);
        }
    }
}
