namespace SimpleMemberShip.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class User
    {
        public int UserID { get; set; }

        [StringLength(56)]
        public string Username { get; set; }

        [StringLength(128)]
        public string Password { get; set; }

        public int? RoleID { get; set; }
    }
}
