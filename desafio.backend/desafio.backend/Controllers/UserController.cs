
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
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public IConfiguration Get_configuration()
        {
            return _configuration;
        }
       
        [HttpGet]
        public JsonResult Get()
        {
            var connect = _configuration.GetConnectionString("CustomerCon");
            MongoClient dbClient = new MongoClient(connect);

            var dbList = dbClient.GetDatabase("portscodeBd").GetCollection<UserModel>("Customers").AsQueryable().ToList();

            return new JsonResult(dbList);
        }

        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            var connect = _configuration.GetConnectionString("CustomerCon");
            MongoClient dbClient = new MongoClient(connect);

            var filter = Builders<UserModel>.Filter.Eq("UserId", id);

            var search = dbClient.GetDatabase("portscodeBd").GetCollection<UserModel>("Customers").Find(filter).FirstOrDefault(); 

            return new JsonResult(search);
        }

        [HttpPost]
        public JsonResult Post(UserModel cus)
        {
            var connect = _configuration.GetConnectionString("CustomerCon");
            MongoClient dbClient = new MongoClient(connect);

            int LastCustomerId = dbClient.GetDatabase("portscodeBd").GetCollection<UserModel>("Customers").AsQueryable().ToList().Count();

            cus.UserId = LastCustomerId + 1;
            cus.Id = Guid.NewGuid().ToString();

            dbClient.GetDatabase("portscodeBd").GetCollection<UserModel>("Customers").InsertOne(cus);

            return new JsonResult("Added Successfully");

        }

        [HttpPut("{id}")]
        public JsonResult Put(UserModel cus, int id)
        {
            var connect = _configuration.GetConnectionString("CustomerCon");
            MongoClient dbClient = new MongoClient(connect);

            var filter = Builders<UserModel>.Filter.Eq("UserId", id);
            var update = Builders<UserModel>.Update.Set("Name", cus.Name)
                                                        .Set("User", cus.User)
                                                        .Set("Password", cus.Password)
                                                        .Set("Cpf", cus.Cpf)
                                                        .Set("Phone", cus.Phone)
                                                        .Set("Email", cus.Email);

            dbClient.GetDatabase("portscodeBd").GetCollection<UserModel>("Customers").UpdateOne(filter,update);

            return new JsonResult("Update Successfully");

        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var connect = _configuration.GetConnectionString("CustomerCon");
            MongoClient dbClient = new MongoClient(connect);

            var filter = Builders<UserModel>.Filter.Eq("UserId", id);

            dbClient.GetDatabase("portscodeBd").GetCollection<UserModel>("Customers").DeleteOne(filter);

            return new JsonResult("Delete Successfully");

        }
    }
}
