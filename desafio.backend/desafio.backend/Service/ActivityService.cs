using AutoMapper;
using desafio.backend.Entities;
using desafio.backend.Infra.Contract;
using desafio.backend.Models;
using System.Collections.Generic;

namespace desafio.backend.Service
{
    public class ActivityService
    {
        private readonly IMapper _mapper;

        private readonly IMongoRepository<ActivityEntity> _activity;


        public ActivityService(IMongoRepository<ActivityEntity> activity, IMapper mapper)
        {
            _mapper = mapper;
            _activity = activity;
        }
        public List<ActivityModel> GetAll()
        {
            var activityList = _activity.GetAll();
            return _mapper.Map<List<ActivityModel>>(activityList);
        }
        public ActivityEntity Get(string id) => _activity.Get(id);
        public ActivityModel Create(ActivityModel activity)
        {
            var entity = _mapper.Map<ActivityEntity>(activity);
            _activity.Create(entity);

            return _mapper.Map<ActivityModel>(Get(entity.Id));
        }
        public void Update(string id, ActivityEntity activityIn)
        {
            _activity.Update(id, activityIn);
        }

        public void Remove(string id) => _activity.Remove(id);
    }
}
