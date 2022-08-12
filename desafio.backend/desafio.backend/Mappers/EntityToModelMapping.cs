using AutoMapper;
using desafio.backend.Entities;
using desafio.backend.Models;

namespace desafio.backend.Mappers
{
    public class EntityToModelMapping : Profile
    {
        public EntityToModelMapping()
        {
            CreateMap<UserEntity, UserModel>();
        }
    }
}
