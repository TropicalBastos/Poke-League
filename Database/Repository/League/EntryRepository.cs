using pokeleague.Models;
using pokeleague.Database.Repository.EFCore;
using pokeleague.Database;

namespace pokeleague.Database.Repository.League
{
    public class EntryRepository : EfCoreRepository<Entry, LeagueDbContext>
    {
        public EntryRepository(LeagueDbContext context) : base(context)
        {

        }
    }
}