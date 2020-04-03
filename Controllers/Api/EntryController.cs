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
    }
}