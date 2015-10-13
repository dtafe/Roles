using SimpleMemberShip.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WebMatrix.WebData;

namespace SimpleMemberShip.Controllers
{
    public class AccountController : Controller
    {
        RolesModel db = new RolesModel();
        //
        // GET: /Account/
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(User login, string ReturnUrl)
        {
            if (ModelState.IsValid)
            {
                using (RolesModel entities = new RolesModel())
                {
                    string username = login.Username;
                    string password = login.Password;

                    // Now if our password was enctypted or hashed we would have done the
                    // same operation on the user entered password here, But for now
                    // since the password is in plain text lets just authenticate directly

                    bool userValid = entities.Users.Any(user => user.Username == username && user.Password == password);

                    // User found in the database
                    if (userValid)
                    {

                        FormsAuthentication.SetAuthCookie(username, false);
                        if (Url.IsLocalUrl(ReturnUrl) && ReturnUrl.Length > 1 && ReturnUrl.StartsWith("/")
                            && !ReturnUrl.StartsWith("//") && !ReturnUrl.StartsWith("/\\"))
                        {
                            return Redirect(ReturnUrl);
                        }
                        else
                        {
                            return RedirectToAction("Index", "Home");
                        }
                        
                    }
                    else
                    {
                        ModelState.AddModelError("", "Sai username hoặc password");
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return View(login);
        }

        [HttpGet]
        public ActionResult Register()
        {
            List<Role> lstrole = new List<Role>();
            using(RolesModel dt = new RolesModel())
            {
                lstrole = dt.Roles.OrderBy(n => n.RoleName).ToList();
            }
            ViewBag.Roles = new SelectList(lstrole, "RoleID", "RoleName");
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(User register)
        {
            List<Role> lstrole = new List<Role>();
            using (RolesModel dt = new RolesModel())
            {
                lstrole = dt.Roles.OrderBy(n => n.RoleName).ToList();
            }
            try
            {
                if(ModelState.IsValid)
                {
                    db.Entry(register).State = EntityState.Added;
                    db.SaveChanges();
                    return RedirectToAction("Index", "Home");
                }
                return View(register);
            }
            catch
            {
                return View();
            }
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }
    }
}
