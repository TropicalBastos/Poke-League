using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace pokeleague.Controllers
{
    public class HomeController : Controller
    {
        [Route("/")]
        public IActionResult Index()
        {
            byte[] htmlContents = System.IO.File.ReadAllBytes("client/build/index.html");
            return new FileContentResult(htmlContents, "text/html");
        }
    }
}