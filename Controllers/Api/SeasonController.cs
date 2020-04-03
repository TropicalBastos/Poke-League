using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using pokeleague.Database.Repository.League;
using pokeleague.Models;
using System.Threading.Tasks;
using System;

namespace pokeleague.Controllers.Api
{
    [Route("api/season")]
    [ApiController]
    public class SeasonController : BaseController<Season, SeasonRepository>
    {
        private SeasonRepository seasonRepository;
        private EntryRepository entryRepository;

        public SeasonController(
            SeasonRepository _seasonRepository, 
            EntryRepository _entryRepository
        ) : base(_seasonRepository)
        {
            seasonRepository = _seasonRepository;
            entryRepository = _entryRepository;
        }


        [Route("resetseason")]
        [HttpPost]
        public async Task<List<Entry>> ResetSeason(DateTime seasonEnd)
        {
            List<Entry> entries = await entryRepository.GetAll();
            var latest = await seasonRepository.GetLatestSeason();
            latest.Winner = entries.OrderByDescending(i => i.Score).First().Name;
            foreach (var entry in entries) {
                entry.Wins = 0;
                entry.Draws = 0;
                entry.Losses = 0;
            }
            entries = await entryRepository.BulkUpdate(entries);
            await seasonRepository.CreateNewSeason(seasonEnd);
            return entries;
        }
    }
}