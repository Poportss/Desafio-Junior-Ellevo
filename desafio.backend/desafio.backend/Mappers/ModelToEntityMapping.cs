using AutoMapper;
using desafio.backend.Entities;
using desafio.backend.Models;

namespace desafio.backend.Mappers
{
    public class ModelToEntityMapping : Profile
    {
        public ModelToEntityMapping()
        {
            CreateMap<UpdateUserModel, UserEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.IsAdmin, opt => opt.Ignore());

            CreateMap<UpdateTaskModel, TaskEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<UserModel, UserEntity>();
            CreateMap<TaskModel, TaskEntity>();
            CreateMap<ActivityModel, ActivityEntity>();
        }
    }
}
