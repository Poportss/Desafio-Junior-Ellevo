using desafio.backend.Entities;
using desafio.backend.Infra.Contract;
using System.Linq;

namespace desafio.backend.Infra
{
    public class TaskRepository : ITaskRepository
    {
        private readonly IMongoRepository<UserEntity> _userRepository;
        private readonly IMongoRepository<TaskEntity> _taskRepository;

        public TaskRepository(IMongoRepository<UserEntity> userRepository, IMongoRepository<TaskEntity> taskRepository)
        {
            _userRepository = userRepository;
            _taskRepository = taskRepository;
        }

        public string GetGeneratorName(string genrator)
        {
            return _userRepository.GetAll().Where(p=> p.Id == genrator).Select(p=>p.Name).FirstOrDefault();
        }
        public string GetResponsableName(string responsable)
        {
            return _userRepository.GetAll().Where(p => p.Id == responsable).Select(p => p.Name).FirstOrDefault();
        }

        public IQueryable<TaskEntity> GetAll()
        {
            return _taskRepository.GetAll();
        }
        public TaskEntity GetById(string id)
        {
            return _taskRepository.Get(id);
        }

        public TaskEntity Create(TaskEntity entity)
        {
            return _taskRepository.Create(entity);
        }

        public void Delete(string id)
        {
             _taskRepository.Remove(id);
        }

        public void Update(string id, TaskEntity entity)
        {
            _taskRepository.Update(id, entity);
        }

    
    }
}
