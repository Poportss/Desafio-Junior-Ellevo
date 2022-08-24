using AutoMapper;
using desafio.backend.Entities;
using desafio.backend.Infra.Contract;
using desafio.backend.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace desafio.backend.Service
{
    public class TaskService
    {
        private readonly IMapper _mapper;

        private readonly ITaskRepository _task;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public TaskService(ITaskRepository task, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _task = task;
            _httpContextAccessor = httpContextAccessor;
        }

        public List<TaskModel> GetAll()
        {
            var taskList = _task.GetAll();
            return _mapper.Map<List<TaskModel>>(taskList);
        }

        public TaskModel GetById(string id)
        {
            var taskEntity = _task.GetById(id);
            var task = _mapper.Map<TaskModel>(taskEntity);

            task.GeneratorName = _task.GetGeneratorName(taskEntity.Genrator);
            task.ResponsibleName = _task.GetResponsableName(taskEntity.Responsible);

            return task;

        }

        
        public TaskModel Create(TaskModel task)
        {
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();

            var token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var genratorId = jwtSecurityTokenHandler.ReadJwtToken(token).Claims.FirstOrDefault(p => p.Type == "UserId").Value;

            var entity =  _mapper.Map<TaskEntity>(task);

            entity.Genrator = genratorId;

            _task.Create(entity);


            return _mapper.Map<TaskModel>(GetById(entity.Id));
        }

        public TaskEntity GetEntity(string id)
        {
            return _task.GetById(id);
        }

        public void Update(string id, TaskEntity taskIn)
        {
            _task.Update(id, taskIn);
        }

        public void Remove(string id) => _task.Delete(id);
    }
}
