using pokeleague.Models;
using pokeleague.Database.Repository.EFCore;
using pokeleague.Database;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;

namespace pokeleague.Database.Repository.League
{
    public class SeasonRepository : EfCoreRepository<Season, LeagueDbContext>
    {
        public SeasonRepository(LeagueDbContext context) : base(context)
        {
        }

        public async Task<Season> GetLatestSeason()
        {
            List<Season> seasons = await GetAll();
            var seasonsOrdered = seasons.OrderByDescending(season => season.SeasonStart);
            return seasonsOrdered.ToArray()[0];
        }

        public async Task<Season> CreateNewSeason(DateTime seasonEnd)
        {
            Season season = new Season {
                SeasonStart = DateTime.Now,
                SeasonEnd = seasonEnd
            };

            season = await Add(season);
            return season;
        }
    }
}