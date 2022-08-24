using AutoMapper;
using desafio.backend.Entities;
using desafio.backend.Infra.Contract;
using desafio.backend.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace desafio.backend.Service
{
    public class ActivityService
    {
        private readonly IMapper _mapper;

        private readonly IActivityRepository _activityRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITaskRepository _taskRepository;


        public ActivityService(IActivityRepository activity, IMapper mapper, IHttpContextAccessor httpContextAccessor, ITaskRepository task)
        {
            _mapper = mapper;
            _activityRepository = activity;
            _httpContextAccessor = httpContextAccessor;
            _taskRepository = task;
        }
        public List<ActivityModel> GetAll()
        {
            var activityList = _activityRepository.GetAll();
            return _mapper.Map<List<ActivityModel>>(activityList);
        }
        public ActivityEntity Get(string Activity) => _activityRepository.GetById(Activity);
        public ActivityModel Create(ActivityModel activity)
        {
            var entity = _mapper.Map<ActivityEntity>(activity);

            var task = _taskRepository.GetById(activity.TaskId);


            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();

            var token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var loggedUserId = jwtSecurityTokenHandler.ReadJwtToken(token).Claims.FirstOrDefault(p => p.Type == "UserId").Value; 

            if(loggedUserId == task.Genrator ||loggedUserId == task.Responsible)
            {
                _activityRepository.Create(entity);
                return _mapper.Map<ActivityModel>(Get(entity.Id));

            }
            return null;


            
        }
    }
}
