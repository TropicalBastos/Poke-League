using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using pokeleague.Database.Repository.League;
using pokeleague.Models;
using System.Threading.Tasks;

namespace pokeleague.Controllers.Api
{
    [Route("api/entries")]
    [ApiController]
    public class EntryController : BaseController<Entry, EntryRepository>
    {
        private EntryRepository repository;

        public EntryController(EntryRepository _repository) : base(_repository)
        {
            repository = _repository;
        }


        [Route("resetseason")]
        [HttpGet]
        public async Task<List<Entry>> ResetSeason()
        {
            List<Entry> entries = await repository.GetAll();
            foreach (var entry in entries) {
                entry.Wins = 0;
                entry.Draws = 0;
                entry.Losses = 0;
            }
            entries = await repository.BulkUpdate(entries);
            return entries;
        }
    }
}