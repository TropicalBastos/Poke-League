using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using pokeleague.Database.Repository.League;
using pokeleague.Models;

namespace pokeleague.Controllers.Api
{
    [Route("api/entries")]
    [ApiController]
    public class EntryController : BaseController<Entry, EntryRepository>
    {
        public EntryController(EntryRepository repository) : base(repository)
        {

        }
    }
}