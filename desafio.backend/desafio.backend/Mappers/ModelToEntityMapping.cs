using AutoMapper;
using desafio.backend.Entities;
using desafio.backend.Models;

namespace desafio.backend.Mappers
{
    public class ModelToEntityMapping : Profile
    {
        public ModelToEntityMapping()
        {
            CreateMap<UserModel, UserEntity>();
        }
    }
}
