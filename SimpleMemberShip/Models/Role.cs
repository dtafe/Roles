namespace SimpleMemberShip.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Role
    {
        public int RoleID { get; set; }

        [StringLength(56)]
        public string RoleName { get; set; }
    }
}
