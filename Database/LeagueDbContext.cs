using Microsoft.EntityFrameworkCore;
using pokeleague.Models;
using System;

namespace pokeleague.Database
{

    public class LeagueDbContext : DbContext
    {

        public LeagueDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Entry> Entries { get; set; }

        public DbSet<Season> Seasons { get; set; }
        
    }

}