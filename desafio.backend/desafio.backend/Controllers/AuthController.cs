
using desafio.backend.Models;
using desafio.backend.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace desafio.backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {



        private readonly ILogger<AuthController> _logger;
        private readonly LoginService _loginService;


        public AuthController(ILogger<AuthController> logger, LoginService loginService)
        {
            _logger = logger;
            _loginService = loginService;
        }



        [HttpPost("login")]
        public ActionResult<object> Login([FromBody] LoginModel user)
        {

            var result = _loginService.Login(user);

            return new {Token = result } ;

        }
    }
}
