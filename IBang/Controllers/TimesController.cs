using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IBang.Models;

namespace IBang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimesController : ControllerBase
    {
        private readonly IBangContext _context;

        public TimesController(IBangContext context)
        {
            _context = context;
        }

        // GET: api/Times
        [HttpGet]
        public IEnumerable<Time> GetTime()
        {
            var activityid = HttpContext.Request.Query["activityid"];

            if (String.IsNullOrEmpty(activityid))
            {
                return _context.Time;
            }

            return _context.Time.Where(time => time.ActivityId.Equals(Int32.Parse(activityid)));
        }

        // GET: api/Times/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTime([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var time = await _context.Time.FindAsync(id);

            if (time == null)
            {
                return NotFound();
            }

            return Ok(time);
        }

        // PUT: api/Times/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTime([FromRoute] int id, [FromBody] Time time)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != time.Id)
            {
                return BadRequest();
            }

            _context.Entry(time).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Times
        [HttpPost]
        public async Task<IActionResult> PostTime([FromBody] Time time)
        {
            if (!ModelState.IsValid)
            {
                // return BadRequest(ModelState);
            }

            var activityTimes = _context.Time.Where(
                    tm => tm.ActivityId.Equals(time.ActivityId));

            var hours = 0;
            foreach (var tm in activityTimes)
            {
                hours += tm.Value;
            }

            if (hours + time.Value > 8)
            {
                var response = new Dictionary<string, int>();
                response.Add("error", 8 - hours);
                return Ok(response);
            }

            _context.Time.Add(time);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTime", new { id = time.Id }, time);
        }

        // DELETE: api/Times/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTime([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var time = await _context.Time.FindAsync(id);
            if (time == null)
            {
                return NotFound();
            }

            _context.Time.Remove(time);
            await _context.SaveChangesAsync();

            return Ok(time);
        }

        private bool TimeExists(int id)
        {
            return _context.Time.Any(e => e.Id == id);
        }
    }
}