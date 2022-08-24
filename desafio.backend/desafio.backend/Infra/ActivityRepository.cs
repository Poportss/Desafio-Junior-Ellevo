using desafio.backend.Entities;
using desafio.backend.Infra.Contract;
using System.Linq;

namespace desafio.backend.Infra
{
    public class ActivityRepository:IActivityRepository
    {
        private readonly IMongoRepository<ActivityEntity> _activityRepository;
        private readonly IMongoRepository<TaskEntity> _taskRepository;

        public ActivityRepository(IMongoRepository<ActivityEntity> activityRepository, IMongoRepository<TaskEntity> taskRepository)
        {
            _activityRepository = activityRepository;
            _taskRepository = taskRepository;
        }

        public string GetGenerator(string genrator)
        {
            return _activityRepository.GetAll().Where(p => p.Id == genrator).Select(p => p.Id).FirstOrDefault();
        }
        public string GetResponsable(string responsable)
        {
            return _activityRepository.GetAll().Where(p => p.Id == responsable).Select(p => p.Id).FirstOrDefault();
        }

        public ActivityEntity Create(ActivityEntity entity)
        {
            return _activityRepository.Create(entity);
        }

        public IQueryable<ActivityEntity> GetAll()
        {
            return _activityRepository.GetAll();
        }

        public ActivityEntity GetById(string id)
        {
            return _activityRepository.Get(id);
        }

    }
}
