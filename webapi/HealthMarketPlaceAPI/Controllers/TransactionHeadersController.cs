using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthMarketPlaceAPI.Model;
using HealthMarketPlaceAPI.Models;
using HealthMarketPlaceAPI.Service;

namespace HealthMarketPlaceAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/TransactionHeaders")]
    public class TransactionHeadersController : Controller
    {
        private readonly healthdbContext _context;
        private readonly IPhysicianService _physicianService;
        public TransactionHeadersController(healthdbContext context, IPhysicianService physicianService)
        {
            _context = context;
            _physicianService = physicianService;

        }

        // GET: api/TransactionHeaders
        [HttpGet]
        public IEnumerable<TransactionHeader> GetTransactionHeader()
        {
            return _context.TransactionHeader;
        }

        // GET: api/TransactionHeaders/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionHeader([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var transactionHeader = await _context.TransactionHeader.SingleOrDefaultAsync(m => m.TransactionHeaderID == id);

            if (transactionHeader == null)
            {
                return NotFound();
            }

            return Ok(transactionHeader);
        }

        // PUT: api/TransactionHeaders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransactionHeader([FromRoute] long id, [FromBody] TransactionHeader transactionHeader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transactionHeader.TransactionHeaderID)
            {
                return BadRequest();
            }

            _context.Entry(transactionHeader).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionHeaderExists(id))
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

        // POST: api/TransactionHeaders
        [HttpPost]
        public async Task<IActionResult> PostTransactionHeader([FromBody] TransactionHeader transactionHeader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TransactionHeader.Add(transactionHeader);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetTransactionHeader", new { id = transactionHeader.TransactionHeaderID }, transactionHeader);
            //return CreatedAtAction("GetTransactionHeader", transactionHeader.GetToken());
            Physician phys = _physicianService.GetPhysician(transactionHeader.PhysicianKey);
            return Ok(transactionHeader.GetSummary(phys));
        }

        // DELETE: api/TransactionHeaders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransactionHeader([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var transactionHeader = await _context.TransactionHeader.SingleOrDefaultAsync(m => m.TransactionHeaderID == id);
            if (transactionHeader == null)
            {
                return NotFound();
            }

            _context.TransactionHeader.Remove(transactionHeader);
            await _context.SaveChangesAsync();

            return Ok(transactionHeader);
        }

        private bool TransactionHeaderExists(long id)
        {
            return _context.TransactionHeader.Any(e => e.TransactionHeaderID == id);
        }
    }
}