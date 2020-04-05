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

        [Route("latest")]
        [HttpGet]
        public async Task<Season> GetLatestSeason()
        {
            var latest = await seasonRepository.GetLatestSeason();

            List<Entry> entries = await entryRepository.GetAll();

            if (DateTime.Now >= latest.SeasonEnd && latest.Winner == null) {
                latest.Winner = entries.OrderByDescending(i => i.Score).First().Name;
                await seasonRepository.Update(latest);
            }

            return latest;
        }


        [Route("resetseason")]
        [HttpPost]
        public async Task<List<Entry>> ResetSeason([FromBody] Season newSeason)
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
            await seasonRepository.CreateNewSeason(newSeason.SeasonEnd);
            return entries;
        }
    }
}