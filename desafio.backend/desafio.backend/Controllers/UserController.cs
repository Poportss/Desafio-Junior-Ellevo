
using AutoMapper;
using desafio.backend.Entities;
using desafio.backend.Models;
using desafio.backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace desafio.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly UserService _userService;
        private readonly IMapper _mapper;


        public UserController(ILogger<UserController> logger, UserService userService, IMapper mapper)
        {
            _logger = logger;
            _userService = userService;
            _mapper = mapper;
        }


        [HttpGet]
        public ActionResult<List<UserModel>> GetAll() => _userService.GetAll();


        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<UserModel> Get(string id)
        {
            var user = _userService.Get(id);

            if (user is null)
                return NotFound();

            return _mapper.Map< UserModel >(user);
        }

        [HttpPost]
        public ActionResult<UserModel> Create(UserModel user)
        {
            var result = _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = result.Id.ToString() }, result);
        }

        [HttpPut("{id:length(24)}")]
        public ActionResult<UserModel> Update(string id, UpdateUserModel user)
        {
            var userIn = _userService.Get(id);

            if (userIn is null)
                return NotFound();

            userIn = _mapper.Map(user, userIn);

            _userService.Update(id, userIn);

            return CreatedAtRoute("GetUser", new { id = id }, user);

        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var user = _userService.Get(id);

            if (user is null)
                return NotFound();

            _userService.Remove(user.Id);

            var result = new
            {
                message = "User deleted!"
            };

            return Ok(result);
        }
    }
}
