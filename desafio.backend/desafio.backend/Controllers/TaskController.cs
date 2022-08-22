using AutoMapper;
using desafio.backend.Models;
using desafio.backend.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace desafio.backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ILogger<TaskController> _logger;
        private readonly TaskService _taskService;
        private readonly IMapper _mapper;


        public TaskController(ILogger<TaskController> logger, TaskService taskService, IMapper mapper)
        {
            _logger = logger;
            _taskService = taskService;
            _mapper = mapper;
        }



        [HttpGet]
        public ActionResult<List<TaskModel>> GetAll() => _taskService.GetAll();


        [HttpGet("{id:length(24)}", Name = "GetTask")]
        public ActionResult<TaskModel> Get(string id)
        {
            var task = _taskService.Get(id);

            if (task is null)
                return NotFound();

            return _mapper.Map<TaskModel>(task);
        }

        [HttpPost]
        public ActionResult<TaskModel> Create(TaskModel task)
        {
            var result = _taskService.Create(task);

            return CreatedAtRoute("GetTask", new { id = result.Id.ToString() }, result);
        }



        [HttpPut("{id:length(24)}")]
        public ActionResult<TaskModel> Update(string id, UpdateTaskModel user)
        {
            var taskIn = _taskService.Get(id);

            if (taskIn is null)
                return NotFound();

            taskIn = _mapper.Map(user, taskIn);

            _taskService.Update(id, taskIn);

            return CreatedAtRoute("GetTask", new { id = id }, user);

        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var task = _taskService.Get(id);

            
            if (task is null)
                return NotFound();

            _taskService.Remove(task.Id);

            var result = new
            {
                message = "User deleted!"
            };

            return Ok(result);
        }
    }
}
