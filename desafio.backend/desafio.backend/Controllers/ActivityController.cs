using AutoMapper;
using desafio.backend.Models;
using desafio.backend.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace desafio.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {
        private readonly ILogger<ActivityController> _logger;
        private readonly ActivityService _ActivityService;
        private readonly IMapper _mapper;

        public ActivityController(ILogger<ActivityController> logger, ActivityService activityService, IMapper mapper)
        {
            _logger = logger;
            _ActivityService = activityService;
            _mapper = mapper;
        }


        [HttpGet]
        public ActionResult<List<ActivityModel>> GetAll() => _ActivityService.GetAll();

        [HttpGet("{id:length(24)}", Name = "GetActivity")]
        public ActionResult<ActivityModel> Get(string id)
        {
            var activity = _ActivityService.Get(id);

            if (activity is null)
                return NotFound();

            return _mapper.Map<ActivityModel>(activity);
        }

        [HttpPost]
        public ActionResult<ActivityModel> Create(ActivityModel activity)
        {
            var result = _ActivityService.Create(activity);

            if (result == null)
            {
                return BadRequest(new { Message = "Only the responsible person or generator can add activities" });

            }

            return result;
        }

    }
}
