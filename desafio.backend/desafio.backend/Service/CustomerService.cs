using AutoMapper;
using desafio.backend.Entities;
using desafio.backend.Infra;
using desafio.backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace desafio.backend.Service
{
    public class CustomerService
    {
        private readonly IMapper _mapper;

        private readonly IMongoRepository<UserEntity> _customer;

        public CustomerService(IMongoRepository<UserEntity> customer, IMapper mapper)
        {
            _mapper = mapper;
            _customer = customer;

        }

        public List<UserModel> Get() =>
            _mapper.Map<List<UserModel>>(_customer.Get().ToList());


        public UserModel Get(string id) =>
           _mapper.Map<UserModel>(_customer.Get(id));

        public UserModel Create(UserModel customer)
        {
            var entity = new UserEntity(customer.Name, customer.User, customer.Password, customer.Cpf, customer.Phone, customer.Email);
            _customer.Create(entity);

            return Get(entity.Id);
        }

        public void Update(string id, UserModel newsIn)
        {
            _customer.Update(id, _mapper.Map<UserEntity>(newsIn));
        }

        public void Remove(string id) => _customer.Remove(id);
    }
   
    
}
