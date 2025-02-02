﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using src.Models;
using src.Services;

namespace src.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventsController(IEventService eventService)
        {
            _eventService = eventService;
        }

        // 404 is only for when there is no such endpoint or resource, not for when there is no data
        // 204 is the correct status code for when there is no data 
        // to return 204, use NoContent() instead of Ok(null)

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents(int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                var response = await _eventService.GetAll(pageNumber, pageSize).ConfigureAwait(false);
                return response != null ? Ok(response) : NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEventById(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest(new { success = false, status = 400, message = "Invalid ID" });

                var response = await _eventService.GetByID(id).ConfigureAwait(false);

                return response != null ? Ok(response) : NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Event>> CreateEvent([FromBody] Event _event)
        {
            try
            {
                if (_event == null)
                    return BadRequest(new { success = false, status = 400, message = "Invalid event" });

                if (!ModelState.IsValid)
                    return BadRequest(new { success = false, status = 400, message = "Invalid event" });

                var response = await _eventService.Create(_event).ConfigureAwait(false);

                return CreatedAtAction(nameof(GetEventById), new { id = response.Id }, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<Event>> UpdateEvent([FromBody] Event _event)
        {
            try
            {
                if (_event == null)
                    return BadRequest(new { success = false, status = 400, message = "Invalid event" });

                if (!ModelState.IsValid)
                    return BadRequest(new { success = false, status = 400, message = "Invalid event" });

                var response = await _eventService.Update(_event).ConfigureAwait(false);

                return AcceptedAtAction(nameof(GetEventById), new { id = response.Id }, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Event>> DeleteEvent(int id)
        {
            try
            {
                
                if (!ModelState.IsValid)
                    return BadRequest(new { success = false, status = 400, message = "Invalid event" });

                var response = await _eventService.Delete(id).ConfigureAwait(false);

                return AcceptedAtAction(nameof(DeleteEvent));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
