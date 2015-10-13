using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimpleMemberShip.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }
        [Authorize]
        public ActionResult Contact()
        {
            return View();
        }
        [Authorize(Roles = "1")]
        public ActionResult Administrator()
        {
            return View();
        }
        
    }
}
