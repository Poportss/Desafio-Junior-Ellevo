using AutoMapper;
using desafio.backend.Entities;
using desafio.backend.Infra.Contract;
using desafio.backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace desafio.backend.Service
{
    public class UserService
    {
        private readonly IMapper _mapper;

        private readonly IMongoRepository<UserEntity> _user;

        public UserService(IMongoRepository<UserEntity> user, IMapper mapper)
        {
            _mapper = mapper;
            _user = user;

        }

        public List<UserModel> GetAll()
        {
            var userList = _user.GetAll();
            return _mapper.Map<List<UserModel>>(userList);
        }


        public UserEntity Get(string id) => _user.Get(id);

        public UserModel Create(UserModel user)
        {
            var entity = new UserEntity(user.Name, user.User, user.Password, user.Cpf, user.Phone, user.Email, user.IsAdmin);
            _user.Create(entity);

            return _mapper.Map<UserModel>(Get(entity.Id));
        }

        public void Update(string id, UserEntity userIn)
        {
            _user.Update(id, userIn);
        }

        public void Remove(string id) => _user.Remove(id);
    }


}
