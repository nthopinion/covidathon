using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HealthMarketPlaceAPI.Model;

namespace HealthMarketPlaceAPI.Models
{
    public class healthdbContext : DbContext
    {
        public healthdbContext (DbContextOptions<healthdbContext> options)
            : base(options)
        {
        }

        public DbSet<HealthMarketPlaceAPI.Model.Patient> Patient { get; set; }
        public DbSet<HealthMarketPlaceAPI.Model.Physician> Physician { get; set; }
        public DbSet<HealthMarketPlaceAPI.Model.TransactionHeader> TransactionHeader { get; set; }
        public DbSet<HealthMarketPlaceAPI.Model.TransactionDetail> TransactionDetail { get; set; }
    }
}
